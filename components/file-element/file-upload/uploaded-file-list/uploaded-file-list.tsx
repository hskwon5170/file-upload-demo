"use client";
import { fileAtom, removeFileAtom } from "@/atom/files";
import { useAtom, useAtomValue } from "jotai";
import FileCard from "../../file-list/file-card";
import FileCards from "../../file-card/file-card";

export default function UploadedFileList() {
  const files = useAtomValue(fileAtom);
  const [_, removeFile] = useAtom(removeFileAtom);

  console.log("조타이의 files", files);

  if (!files || files.length === 0) return null;

  return (
    <div className="flex flex-col items-center p-3 border rounded-xl min-h-72">
      <section>1 / 1개 완료</section>
      <section className="py-3">
        <div className="w-[300px] h-[5px] rounded-md bg-blue-600" />
      </section>
      <section className="border bg-white">
        {files.map((file: File, idx: any) => (
          <div key={file.size} className="flex">
            <FileCards />
            {/* <span onClick={() => removeFile(file)}>x</span> */}
          </div>
        ))}
      </section>
    </div>
  );
}
