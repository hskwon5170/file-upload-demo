"use client";
import { fileAtom } from "@/atom/files";
import { useAtomValue } from "jotai";
import FileCards from "../../file-card/file-card";
import { useMemo } from "react";

export default function UploadedFileList() {
  const files = useAtomValue(fileAtom);
  // const [_, removeFile] = useAtom(removeFileAtom);
  console.log("files입니다", files);
  const uploadedSuccessFiles = useMemo(() => {
    return files.filter((file) => file?.progress === 100);
  }, [files]);

  if (!files || files.length === 0) return null;

  return (
    <div
      className="flex flex-col items-center p-3 border rounded-xl min-h-72 w-[500px] overflow-hidden bg-white
    "
    >
      <section>
        <span className="text-blue-500 font-extrabold">
          {uploadedSuccessFiles.length}
        </span>{" "}
        / {files.length}개 <span className="font-extrabold">완료</span>
      </section>

      <section className="w-full">
        {files.map((file, idx: any) => (
          <div key={idx}>
            <FileCards file={file} />
            {/* <span onClick={() => removeFile(file)}>x</span> */}
          </div>
        ))}
      </section>
    </div>
  );
}
