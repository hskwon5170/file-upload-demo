'use client';
import { closeAtom, fileAtom } from '@/atom/files';
import { useAtom, useSetAtom } from 'jotai';
import { useRef, useState, DragEvent } from 'react';
import { IoMdCloudUpload } from 'react-icons/io';
import axios from 'axios';
import FileDragActivePannel from '../../file-drag-active-pannel/file-drag-active.pannel';
import { FcFile } from 'react-icons/fc';
import { FcImageFile } from 'react-icons/fc';
import type { FileWithProgress } from '@/types/files';

export default function FileDropZone() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useAtom(fileAtom);
  const [dragActive, setDragActive] = useState(false);
  const setClose = useSetAtom(closeAtom);
  const timeStamp = new Date().getTime();

  const handleDrop = async (e: DragEvent) => {
    setClose(false);
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    for (const newFile of Array.from(e.dataTransfer.files)) {
      const fileWithStatus: FileWithProgress = {
        file: newFile,
        progress: 0,
        status: 'uploading',
        id: timeStamp + newFile.lastModified,
        isError: false,
      };

      const isAlreadyUploaded = isFileAlreadyUploaded(newFile, files);

      if (isAlreadyUploaded) {
        const isReuploadConfirmed = window.confirm(`${newFile.name} 파일은 이미 업로드 되었습니다. 다시 업로드 하시겠습니까?`);
        if (isReuploadConfirmed) {
          setFiles((prev) => {
            const updateFile = prev.map((files) => {
              if (
                files.file.name === newFile.name &&
                files.file.size === newFile.size &&
                files.file.lastModified === newFile.lastModified
              ) {
                return {
                  ...files,
                  file: newFile,
                  progress: 0,
                  status: 'uploading',
                  id: timeStamp + newFile.lastModified,
                  isError: false,
                };
              }
              return files;
            });
            return updateFile;
          });
        } else {
          continue;
        }
        setFiles((prev) => prev.filter((file) => file.id !== fileWithStatus.id));
      }

      setFiles((prev) => [...prev, fileWithStatus]);

      await UploadFile(fileWithStatus);
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
    inputRef.current.value = '';
    inputRef.current?.click();
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setClose(false);

    const fileArray = e.target.files;
    if (!fileArray) return;

    for (const SelectedFiles of Array.from(fileArray)) {
      const isAlreadyUploaded = isFileAlreadyUploaded(SelectedFiles, files);
      console.log('isAlreadyUploaded', isAlreadyUploaded);

      if (isAlreadyUploaded) {
        const prompt = window.confirm(`${SelectedFiles.name}은 이미 업로드된 파일입니다. 다시 업로드하시겠습니까?`);
        if (prompt) {
          setFiles((prev) => {
            const updateFile = prev.map((f) => {
              if (
                f.file.name === SelectedFiles.name &&
                f.file.size === SelectedFiles.size &&
                f.file.lastModified === SelectedFiles.lastModified
              ) {
                return {
                  ...f,
                  file: SelectedFiles,
                  progress: 0,
                  status: 'uploading',
                  id: timeStamp + SelectedFiles.lastModified,
                  isError: false,
                };
              }
              return f;
            });
            return updateFile;
          });
        } else {
          continue;
        }
      }

      const fileWithStatus: FileWithProgress = {
        file: SelectedFiles,
        progress: 0,
        status: 'uploading',
        id: timeStamp + SelectedFiles.lastModified,
        isError: false,
      };

      if (isAlreadyUploaded) {
        setFiles((prev) => prev.filter((file) => file.id !== fileWithStatus.id));
      }

      UploadFile(fileWithStatus);
      setFiles((prev) => [...prev, fileWithStatus]);
    }
  };

  const isFileAlreadyUploaded = (newFile: File, uploadedFile: FileWithProgress[]) => {
    return uploadedFile.some(
      (f) => f.file.name === newFile.name && f.file.size === newFile.size && f.file.lastModified === newFile.lastModified,
    );
  };

  const UploadFile = async (fileWithStatus: FileWithProgress) => {
    const formData = new FormData();
    formData.append('file', fileWithStatus.file);

    try {
      await axios.post('http://10.1.1.190:8084/api/files/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (e) => {
          const percentCompleted = Math.round((e.loaded * 100) / e.total!);
          setFiles((prev) => {
            return prev.map((file) => {
              if (file.id === fileWithStatus.id) {
                return { ...file, progress: percentCompleted };
              }
              return file;
            });
          });
        },
      });

      setFiles((prev) => prev.map((file) => (file?.id === fileWithStatus?.id ? { ...file, status: 'done', progress: 100 } : file)));
      // console.log("업로드 성공", response);
    } catch (error) {
      // console.error("error입니다", error);
      setFiles((prev) => {
        return prev.map((file) => {
          if (file.id === fileWithStatus.id) {
            return { ...file, status: 'error', progress: 0, isError: true };
          } else {
            return file;
          }
        });
      });
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div>
        {dragActive ? (
          <form
            className="border-8  border-blue-600 p-4 w-[800px] rounded-2xl min-h-[24rem] text-center flex flex-col items-center justify-center cursor-pointer z-10"
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <input placeholder="fileInput" type="file" accept=".xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf" hidden />
            <FileDragActivePannel />
          </form>
        ) : (
          <form
            className="bg-gray-100 p-4 w-[800px] rounded-2xl min-h-[24rem] text-center flex flex-col items-center justify-center cursor-pointer border-2"
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
              <IoMdCloudUpload className="text-[100px]" />
              <div className="my-6 text-2xl font-bold">파일을 업로드하세요</div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
