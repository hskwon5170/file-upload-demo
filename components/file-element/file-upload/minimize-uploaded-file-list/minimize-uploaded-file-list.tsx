"use client";
import { minimizeFileListAtom } from "@/atom/files";
import { useAtom } from "jotai";
import { FaCheck } from "react-icons/fa";

export default function MinimizeUploadedFileList() {
  const [minimize, setMinimize] = useAtom(minimizeFileListAtom);
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
          <div>5 / 5개 올리기 완료</div>
        </div>
        <div>닫기</div>
      </div>
    </div>
  );
}
