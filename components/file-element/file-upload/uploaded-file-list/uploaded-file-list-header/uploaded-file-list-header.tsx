"use client";

import { fileAtom, minimizeFileListAtom } from "@/atom/files";
import { useAtomValue, useSetAtom } from "jotai";
import { useMemo } from "react";
import { MdClose } from "react-icons/md";
import { VscChromeMinimize } from "react-icons/vsc";

export default function UploadedFileListHeader() {
  const files = useAtomValue(fileAtom);
  const uploadedSuccessFiles = useMemo(() => {
    return files.filter((file) => file?.progress === 100);
  }, [files]);
  const setMinimize = useSetAtom(minimizeFileListAtom);

  return (
    <div className="flex items-center w-full px-3">
      <div className="flex-1">
        <span className="text-blue-500 font-extrabold">
          {uploadedSuccessFiles.length}
        </span>
        / {files.length}개 <span className="font-extrabold">완료</span>
      </div>
      <div className="flex items-center gap-3">
        <VscChromeMinimize
          className="hover:bg-gray-100 cursor-pointer"
          onClick={() => setMinimize(true)}
        />
        <MdClose className="hover:bg-gray-100 cursor-pointer" />
      </div>
    </div>
  );
}
