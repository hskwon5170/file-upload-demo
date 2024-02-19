"use client";
import { fileAtom, minimizeFileListAtom } from "@/atom/files";
import { useAtom, useAtomValue } from "jotai";
import FileCards from "../../file-card/file-card";
import { useMemo } from "react";
import UploadedFileListHeader from "./uploaded-file-list-header/uploaded-file-list-header";
import MinimizeUploadedFileList from "../minimize-uploaded-file-list/minimize-uploaded-file-list";

export default function UploadedFileList() {
  const files = useAtomValue(fileAtom);
  // const [_, removeFile] = useAtom(removeFileAtom);
  console.log("파일!!!", files);
  const [minimize, setMinimize] = useAtom(minimizeFileListAtom);

  if (!files || files.length === 0) return null;

  return (
    <>
      <div className={`${minimize ? "" : "hidden"}`}>
        <MinimizeUploadedFileList />
      </div>
      <div
        className={`flex flex-col items-center p-3 border rounded-xl min-h-72 w-[500px] overflow-hidden bg-white
    ${minimize ? "hidden" : ""}`}
      >
        <UploadedFileListHeader />

        <section className="w-full">
          {files.map((file, idx: any) => (
            <div key={file.id}>
              <FileCards file={file} />
              {/* <span onClick={() => removeFile(file)}>x</span> */}
            </div>
          ))}
        </section>
      </div>
    </>
  );
}
