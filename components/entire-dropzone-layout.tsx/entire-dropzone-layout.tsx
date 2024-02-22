'use client';
import { fileAtom } from '@/atom/files';
import type { FileWithProgress } from '@/types/files';
import axios from 'axios';
import { useAtom } from 'jotai';
import { DragEvent } from 'react';

type Props = {
  children: React.ReactNode;
};

export default function EntireDropzoneLayout({ children }: Props) {
  const timeStamp = new Date().getTime();

  const [files, setFiles] = useAtom(fileAtom);

  const handleDrop = async (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    for (const newFile of Array.from(e.dataTransfer.files)) {
      const fileWithStatus: FileWithProgress = {
        file: newFile,
        progress: 0,
        status: 'uploading',
        id: timeStamp + newFile.lastModified,
        isError: false,
      };

      setFiles((prev) => [...prev, fileWithStatus]);
      UploadFile(fileWithStatus);
    }
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
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
    <>
      <div className="w-full h-full bg-blue-300" onDrop={handleDrop} onDragOver={handleDragOver}>
        {children}
      </div>
    </>
  );
}
