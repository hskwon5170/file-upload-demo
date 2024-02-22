'use client';
import { closeAtom, fileAtom, minimizeFileListAtom } from '@/atom/files';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { useMemo } from 'react';
import { FaCheck } from 'react-icons/fa';

export default function MinimizeUploadedFileList() {
  const [minimize, setMinimize] = useAtom(minimizeFileListAtom);
  const files = useAtomValue(fileAtom);
  const setClose = useSetAtom(closeAtom);
  // console.log('files', files);
  const uploadedSuccessFiles = useMemo(() => {
    return files?.filter((file) => file?.progress === 100);
  }, [files]);

  if (!files) return null;
  if (!files.length) return null;

  return (
    <div
      className="h-[80px] w-[500px] bg-blue-600 rounded-xl border cursor-pointer flex items-center"
      onClick={() => setMinimize(!minimize)}
    >
      <div className="flex w-full px-4 text-white">
        <div className="flex flex-1 gap-4">
          <div className="flex items-center justify-center w-6 h-6 p-1 border-2 border-white rounded-full">
            <FaCheck />
          </div>
          <div className="font-extrabold">
            <span>{uploadedSuccessFiles.length}</span> / {files.length}개 <span> 올리기 완료</span>
          </div>
        </div>
        <div onClick={() => setClose(true)}>닫기</div>
      </div>
    </div>
  );
}
