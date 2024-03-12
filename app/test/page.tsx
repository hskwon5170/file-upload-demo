'use client';
import { closeAtom } from '@/atom/files';
import FileDragActivePannel from '@/components/file-element/file-drag-active-pannel/file-drag-active.pannel';
import create from '@/lib/add-file';
import axios from 'axios';
import { useSetAtom } from 'jotai';
import { DragEvent, useRef, useState } from 'react';
import { useFormState } from 'react-dom';
import { IoMdCloudUpload } from 'react-icons/io';

export default function Test() {
  //   const [state, formAction] = useFormState(create, {});
  //   console.log('state', state);

  const inputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const setClose = useSetAtom(closeAtom);

  const handleDrop = async (e: DragEvent) => {
    setClose(false);
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const formData = new FormData();
    for (const files of Array.from(e.dataTransfer.files)) {
      formData.append('image', files);
    }
    create(formData);
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
    <div>
      {dragActive ? (
        <form
          className="border-8  border-blue-600 p-4 w-[800px] rounded-2xl min-h-[14rem] text-center flex flex-col items-center justify-center cursor-pointer"
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          // action={formAction}
        >
          <input
            placeholder="fileInput"
            // type="file"
            type="submit"
            id="files"
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
          action={create}
        >
          <input
            ref={inputRef}
            //   onChange={handleFileSelect}
            placeholder="fileInput"
            type="file"
            name="image"
            id="image"
            multiple={true}
            accept=".xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf"
            hidden
          />
          <div className="flex flex-col items-center justify-center gap-3 text-gray-500">
            <IoMdCloudUpload className="text-[60px]" />
            <div className="my-6 text-2xl font-bold">파일을 업로드하세요</div>
          </div>
        </form>
      )}
    </div>
  );
}
