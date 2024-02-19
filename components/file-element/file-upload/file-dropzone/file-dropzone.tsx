"use client";
import { fileAtom } from "@/atom/files";
import { useAtom } from "jotai";
import { useRef, useState } from "react";
import { TfiUpload } from "react-icons/tfi";
import axios from "axios";

export default function FileDropZone() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useAtom(fileAtom);
  const [dragActive, setDragActive] = useState(false);

  const handleChange = (e: any) => {
    e.preventDefault();
    const files = e.target.files;
    if (files && files[0]) {
      for (let i = 0; i < files["length"]; i++) {
        setFiles((prev: any) => [...prev, files[i]]);
      }
    }
  };

  // const handleSubmitFile = async (e: any) => {
  //   e.preventDefault();
  //   if (files.length === 0) {
  //     alert("업로드할 파일을 선택해주세요");
  //     return;
  //   }

  //   const formData = new FormData();
  //   files.forEach((file) => {
  //     formData.append("file", file);
  //   });

  //   try {
  //     const response = await axios.post(
  //       "http://10.1.1.190:8084/api/files/upload",
  //       formData,
  //       {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //         onUploadProgress: (progressEvent) => {
  //           const percentCompleted = Math.round(
  //             (progressEvent.loaded * 100) / progressEvent.total!
  //           );
  //           console.log(`${percentCompleted}% 업로드 됨`);
  //         },
  //       }
  //     );
  //     console.log("업로드 성공", response);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleDrop = async (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const files = e.dataTransfer.files;
      // for (let i = 0; i < e.dataTransfer.files["length"]; i++) {
      //   setFiles((prev: any) => [...prev, e.dataTransfer.files[i]]);
      // }
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append("file", files[i]);
      }

      try {
        const response = await axios.post(
          "http://10.1.1.190:8084/api/files/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            onUploadProgress: (e) => {
              const percentCompleted = Math.round((e.loaded * 100) / e.total!);
              console.log(`${percentCompleted}% 업로드 됨`);
            },
          }
        );
        console.log("업로드 성공", response);
        const uploadedFiles = Array.from(files).map((file) => ({
          name: file.name,
          status: "Uploaded",
        }));
        setFiles((prev) => [...prev, ...uploadedFiles]);
      } catch (error) {
        console.error(error);
      }
    }
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
    <div className="flex items-center justify-center ">
      <form
        className={`${
          dragActive ? "border-2 border-blue-700" : "bg-gray-100"
        }  p-4 w-[800px] rounded-lg  min-h-[16rem] text-center flex flex-col items-center justify-center cursor-pointer border-2`}
        onDragEnter={handleDragEnter}
        onSubmit={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onClick={openFileExplorer}
      >
        <input
          placeholder="fileInput"
          ref={inputRef}
          type="file"
          multiple={true}
          onChange={handleChange}
          accept=".xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf"
          hidden
        />

        <div className="flex flex-col gap-3 justify-center items-center text-gray-500">
          <TfiUpload className="text-3xl" />
          <div className="font-bold text-xl">파일을 업로드하세요</div>
        </div>

        {/* <button
          className="bg-black rounded-lg p-2 mt-3 w-auto"
          onClick={handleSubmitFile}
        >
          <span className="p-2 text-white">Submit</span>
        </button> */}
      </form>
    </div>
  );
}
