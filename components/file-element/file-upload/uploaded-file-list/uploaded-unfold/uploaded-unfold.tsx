"use client";

import { fileAtom, minimizeFileListAtom } from "@/atom/files";
import { useAtomValue } from "jotai";
import UploadedFileListHeader from "../uploaded-file-list-header/uploaded-file-list-header";
import FileCards from "@/components/file-element/file-card/file-card";
import styles from "./uploded-unfold.module.css";
import { useState } from "react";

export default function UploadedUnfold() {
  const files = useAtomValue(fileAtom);
  const minimize = useAtomValue(minimizeFileListAtom);
  const [expand, setExpand] = useState(!minimize);
  console.log("files아톰", files);

  if (!files) return null;
  if (!files.length) return null;

  return (
    <div
      className={`flex flex-col items-center p-3 border rounded-xl max-h-[386px] w-[500px] overflow-hidden bg-white overflow-y-auto
    ${minimize ? "hidden" : ""} ${styles["list"]}`}
    >
      <UploadedFileListHeader />

      <section>
        {files.map((file) => (
          <div key={file.id}>
            <FileCards file={file} />
            {/* <span onClick={() => removeFile(file)}>x</span> */}
          </div>
        ))}
      </section>
    </div>
  );
}
