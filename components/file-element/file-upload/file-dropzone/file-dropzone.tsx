"use client";
import { fileAtom } from "@/atom/files";
import { useAtom } from "jotai";
import { useRef, useState } from "react";
import { TfiUpload } from "react-icons/tfi";
import { IoMdCloudUpload } from "react-icons/io";
import axios from "axios";
import FileDragActivePannel from "../../file-drag-active-pannel/file-drag-active.pannel";

type FileWithProgress = {
  file: File;
  progress?: number;
  status: "uploading" | "done";
  id: number;
  isError?: boolean;
};

export default function FileDropZone() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useAtom(fileAtom);
  const [dragActive, setDragActive] = useState(false);

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const timestamp = new Date().getTime();

    const uploadedFiles: FileWithProgress[] = Array.from(
      e.dataTransfer.files
    ).map((file, idx) => ({
      file,
      progress: 0,
      status: "uploading",
      id: timestamp + idx,
      isError: false,
    }));

    setFiles((prev) => [...prev, ...uploadedFiles]);

    uploadedFiles.forEach(async (fileWithStatus) => {
      const formData = new FormData();
      formData.append("file", fileWithStatus.file);

      try {
        await axios.post("http://10.1.1.190:8084/api/files/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
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

        setFiles((prev) =>
          prev.map((file) =>
            file?.id === fileWithStatus?.id
              ? { ...file, status: "done", progress: 100 }
              : file
          )
        );
        // console.log("업로드 성공", response);
      } catch (error) {
        // console.error("error입니다", error);
        setFiles((prev) => {
          return prev.map((file) => {
            if (file.id === fileWithStatus.id) {
              return { ...file, status: "error", progress: 0, isError: true };
            } else {
              return file;
            }
          });
        });
      }
    });
  };

  const handleDragLeave = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragEnter = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const removeFile = (fileName: any, idx: any) => {
    const newArr = [...files];
    newArr.splice(idx, 1);
    setFiles([]);
    setFiles(newArr);
  };

  const openFileExplorer = () => {
    inputRef.current.value = "";
    inputRef.current?.click();
  };

  return (
    <div className="flex items-center justify-center">
      <div>
        {dragActive ? (
          <form
            className="border-8  border-blue-600 p-4 w-[800px] rounded-lg min-h-[24rem] text-center flex flex-col items-center justify-center cursor-pointer"
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
            className="bg-gray-100 p-4 w-[800px] rounded-lg min-h-[24rem] text-center flex flex-col items-center justify-center cursor-pointer border-2"
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={openFileExplorer}
          >
            <input
              ref={inputRef}
              placeholder="fileInput"
              type="file"
              multiple={true}
              accept=".xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf"
              hidden
            />
            <div className="flex flex-col gap-3 justify-center items-center text-gray-500">
              <IoMdCloudUpload className="text-[100px]" />
              <div className="font-bold text-2xl my-6">파일을 업로드하세요</div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
