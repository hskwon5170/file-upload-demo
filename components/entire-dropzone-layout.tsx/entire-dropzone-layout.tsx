'use client';
import useHandleFile from '@/hooks/useHandleFile';
import useUpload from '@/hooks/useUpload';
import { DragEvent, useState, useEffect } from 'react';
import EntireDropzonePannel from './entire-dropzone-pannel';
import { useAtomValue, useSetAtom } from 'jotai';
import { closeAtom, isOrderChangeAtom } from '@/atom/files';
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
  const setClose = useSetAtom(closeAtom);
  const isOrderChange = useAtomValue(isOrderChangeAtom);
  // console.log('isOrderChange, ', isOrderChange);

  useEffect(() => {
    if (dragCounter === 0) {
      setDragActive(false);
    }

    if (dragCounter === 1) {
      setDragActive(true);
    }
  }, [dragCounter]);

  const handleDrop = async (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragCounter(0);
    setClose(false);

    for (const newFile of Array.from(e.dataTransfer.files)) {
      const [isValid, errorMsg] = validateFileType(newFile.type);
      if (!isValid) {
        alert(errorMsg);
        return;
      }

      const handledFile = await checkAlreadyUploaded(newFile);
      UploadFile(handledFile as FileWithProgress);
    }
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragEnter = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragCounter((prev) => prev + 1);
  };

  const handleDragLeave = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragCounter((prev) => prev - 1);
  };

  console.log('dragActive', dragActive, 'isOrderChange', isOrderChange);

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
      {dragActive && isOrderChange === false && (
        <div
          style={isModal ? modalStyle : {}}
          className="absolute inset-0 flex justify-center items-center border-8 z-50  border-[#5347cf] bg-white bg-opacity-30 backdrop-blur-lg"
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
  const isValidFileType = ['image/jpeg', 'application/pdf'].includes(fileType);
  const errorMessage = isValidFileType ? null : 'JPG, PDF 파일만 업로드 가능합니다';
  return [isValidFileType, errorMessage];
};
