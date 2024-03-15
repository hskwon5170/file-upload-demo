'use client';
import useHandleFile from '@/hooks/useHandleFile';
import useUpload from '@/hooks/useUpload';
import { DragEvent, useState, useEffect, useMemo } from 'react';
import EntireDropzonePannel from './entire-dropzone-pannel';
import { useAtomValue, useSetAtom } from 'jotai';
import { closeAtom, fileAtom, isBlankSpaceDragAtom, isOrderChangeAtom } from '@/atom/files';
import type { FileWithProgress } from '@/types/files';

type Props = {
  children: React.ReactNode;
  isModal?: boolean;
};

export default function EntireDropzoneLayout({ children, isModal }: Props) {
  const { UploadFile, handleTaskGroup } = useUpload();
  const { checkAlreadyUploaded } = useHandleFile();
  const [dragActive, setDragActive] = useState(false);
  const [dragCounter, setDragCounter] = useState(0);
  const isBlankSpaceDrag = useAtomValue(isBlankSpaceDragAtom);
  const setClose = useSetAtom(closeAtom);
  const isOrderChange = useAtomValue(isOrderChangeAtom);
  const files = useAtomValue(fileAtom);

  // const isOcrFailedExists = files.some((file) => file.isOcrFailed);
  const isOcrFailedExists = useMemo(() => files.some((file) => file.isOcrFailed), [files]);

  useEffect(() => {
    // 파일 순서 변경X, dragCounter가 0
    if (!isOrderChange && dragCounter === 0) {
      setDragActive(false);
    }

    // 파일 순서 변경X, dragCounter가 1
    if (!isOrderChange && dragCounter === 1) {
      setDragActive(true);
    }

    // 파일 순서 변경O
    if (isOrderChange) {
      setDragActive(false);
    }
  }, [dragCounter, isOrderChange]);

  const handleDrop = async (e: DragEvent) => {
    if (isOcrFailedExists) return;
    e.preventDefault();
    e.stopPropagation();
    setDragCounter(0);
    setClose(false);

    for (const droppedFile of Array.from(e.dataTransfer.files)) {
      const [isValid, errorMsg] = validateFileType(droppedFile.type);
      if (!isValid) {
        alert(errorMsg);
        continue;
      }
      const checkedFile = await checkAlreadyUploaded(droppedFile);
      UploadFile(checkedFile as FileWithProgress);
    }
  };

  const handleDragOver = (e: DragEvent) => {
    if (isOcrFailedExists) return;
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragEnter = (e: DragEvent) => {
    if (isOcrFailedExists) return;
    e.preventDefault();
    e.stopPropagation();
    setDragCounter((prev) => prev + 1);
  };

  const handleDragLeave = (e: DragEvent) => {
    if (isOcrFailedExists) return;
    e.preventDefault();
    e.stopPropagation();
    setDragCounter((prev) => prev - 1);
  };
  return (
    <div
      style={isModal ? modalStyle : {}}
      // style={{ width: `${width}px`, height: `${height}px` }}
      className="w-full h-full relative z-40 p-10"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
    >
      {children}
      {dragActive && isOrderChange === false && !isBlankSpaceDrag && !isOcrFailedExists && (
        <div
          style={isModal ? modalStyle : {}}
          className="absolute inset-0 flex justify-center items-center border-8 z-50  border-[#5d51d2] bg-white bg-opacity-30 backdrop-blur-lg"
        >
          <EntireDropzonePannel isModal={isModal} />
        </div>
      )}
    </div>
  );
}

const modalStyle = {
  width: '508px',
  height: '508px',
  borderRadius: '12px',
};

const validateFileType = (fileType: string): [boolean, string | null] => {
  const isValidFileType = ['image/jpeg', 'application/pdf', 'image/png'].includes(fileType);
  const errorMessage = isValidFileType ? null : 'JPG, PDF 파일만 업로드 가능합니다';
  return [isValidFileType, errorMessage];
};
