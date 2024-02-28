'use client';
import useHandleFile from '@/hooks/useHandleFile';
import useUpload from '@/hooks/useUpload';
import type { FileWithProgress } from '@/types/files';
import { DragEvent, useState, useEffect } from 'react';
import EntireDropzonePannel from './entire-dropzone-pannel';
import { useSetAtom } from 'jotai';
import { closeAtom } from '@/atom/files';

type Props = {
  children: React.ReactNode;
};

export default function EntireDropzoneLayout({ children }: Props) {
  const { UploadFile } = useUpload();
  const { handleFile } = useHandleFile();
  const [dragActive, setDragActive] = useState(false);
  const [dragCounter, setDragCounter] = useState(0);
  const setClose = useSetAtom(closeAtom);

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
      const handledFile = await handleFile(newFile);
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

  return (
    <>
      <div
        className="w-full h-full relative z-40 p-10"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
      >
        {children}
        {dragActive && (
          <div className="absolute inset-0 flex justify-center items-center border-8 z-50  border-blue-500 bg-white bg-opacity-70 backdrop-blur-sm">
            <EntireDropzonePannel />
          </div>
        )}
      </div>
    </>
  );
}
