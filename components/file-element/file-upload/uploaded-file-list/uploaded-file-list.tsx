"use client";
import { fileAtom } from "@/atom/files";
import { useAtom, useAtomValue } from "jotai";
import FileCards from "../../file-card/file-card";
import { useMemo } from "react";

export default function UploadedFileList() {
  const files = useAtomValue(fileAtom);
  // const [_, removeFile] = useAtom(removeFileAtom);

  const uploadedSuccessFiles = useMemo(() => {
    return files.filter((file) => file.progress === 100);
  }, [files]);

  if (!files || files.length === 0) return null;

  console.log("uploadedSuccessFiles", uploadedSuccessFiles);

  return (
    <div
      className="flex flex-col items-center p-3 border rounded-xl min-h-72 w-[380px] overflow-hidden
    "
    >
      <section>
        <span className="text-blue-800 font-bold">
          {uploadedSuccessFiles.length}
        </span>{" "}
        / {files.length}개 <span className="font-extrabold">완료</span>
      </section>
      <section className="py-3">
        <div className="w-[300px] h-[5px] rounded-md bg-blue-600" />
      </section>
      <section className="bg-white w-[380px]">
        {files.map((file, idx: any) => (
          <div key={idx} className="flex">
            <FileCards file={file} />
            {/* <span onClick={() => removeFile(file)}>x</span> */}
          </div>
        ))}
      </section>
    </div>
  );
}
