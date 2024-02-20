"use client";
import { fileAtom, minimizeFileListAtom } from "@/atom/files";
import { useAtom, useAtomValue } from "jotai";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { FaCheck } from "react-icons/fa";

export default function MinimizeUploadedFileList() {
  const router = useRouter();
  const [minimize, setMinimize] = useAtom(minimizeFileListAtom);
  const files = useAtomValue(fileAtom);
  const uploadedSuccessFiles = useMemo(() => {
    return files.filter((file) => file?.progress === 100);
  }, [files]);

  return (
    <div
      className="h-[80px] w-[500px] bg-blue-600 rounded-xl border cursor-pointer flex items-center"
      onClick={() => setMinimize(!minimize)}
    >
      <div className="flex w-full px-4 text-white">
        <div className="flex-1 flex gap-4">
          <div className="border-2 border-white w-6 h-6 flex items-center justify-center rounded-full p-1">
            <FaCheck />
          </div>
          <div className="font-extrabold">
            <span>{uploadedSuccessFiles.length}</span> / {files.length}개{" "}
            <span> 올리기 완료</span>
          </div>
        </div>
        {/* <div>닫기</div> */}
      </div>
    </div>
  );
}
