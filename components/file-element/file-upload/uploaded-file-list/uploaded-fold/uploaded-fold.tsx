"use client";

import { minimizeFileListAtom } from "@/atom/files";
import { useAtom } from "jotai";
import MinimizeUploadedFileList from "../../minimize-uploaded-file-list/minimize-uploaded-file-list";

export default function UploadedFold() {
  const [minimize, setMinimize] = useAtom(minimizeFileListAtom);

  return (
    <div className={`${minimize ? "" : "hidden"}`}>
      <MinimizeUploadedFileList />
    </div>
  );
}
