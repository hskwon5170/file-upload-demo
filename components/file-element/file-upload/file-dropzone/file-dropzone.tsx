'use client';
import { closeAtom } from '@/atom/files';
import { useSetAtom } from 'jotai';
import { useRef, useState, DragEvent } from 'react';
import { IoMdCloudUpload } from 'react-icons/io';
import FileDragActivePannel from '../../file-drag-active-pannel/file-drag-active.pannel';
import useUpload from '@/hooks/useUpload';
import useHandleFile from '@/hooks/useHandleFile';
import type { FileWithProgress } from '@/types/files';

export default function FileDropZone() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const setClose = useSetAtom(closeAtom);

  const { UploadFile } = useUpload();
  const { handleFile } = useHandleFile();

  const handleDrop = async (e: DragEvent) => {
    setClose(false);
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    for (const files of Array.from(e.dataTransfer.files)) {
      const handledFile = await handleFile(files);
      UploadFile(handledFile as FileWithProgress);
    }
  };

  const handleFileSelect = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setClose(false);
    const fileArray = e.target.files;
    if (!fileArray) return;

    for (const SelectedFiles of Array.from(fileArray)) {
      const handledFile = await handleFile(SelectedFiles);
      UploadFile(handledFile as FileWithProgress);
    }
  };

  const handleDragLeave = (e: DragEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleDragOver = (e: DragEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragEnter = (e: DragEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const openFileExplorer = () => {
    if (inputRef.current) {
      inputRef.current.value = '';
      inputRef.current.click();
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div>
        {dragActive ? (
          <form
            className="border-8  border-blue-600 p-4 w-[800px] rounded-2xl min-h-[14rem] text-center flex flex-col items-center justify-center cursor-pointer"
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <input
              placeholder="fileInput"
              type="file"
              accept=".xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf"
              hidden
            />
            <FileDragActivePannel />
          </form>
        ) : (
          <form
            className="bg-gray-100 p-4 w-[800px] rounded-2xl min-h-[14rem] text-center flex flex-col items-center justify-center cursor-pointer border-2"
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={openFileExplorer}
          >
            <input
              ref={inputRef}
              onChange={handleFileSelect}
              placeholder="fileInput"
              type="file"
              multiple={true}
              accept=".xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf"
              hidden
            />
            <div className="flex flex-col items-center justify-center gap-3 text-gray-500">
              <IoMdCloudUpload className="text-[60px]" />
              <div className="my-6 text-2xl font-bold">
                파일을 업로드하세요
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
