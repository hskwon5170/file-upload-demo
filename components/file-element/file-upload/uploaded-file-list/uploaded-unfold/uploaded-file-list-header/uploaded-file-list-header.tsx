'use client';

import { closeAtom, fileAtom, minimizeFileListAtom } from '@/atom/files';
import ProgressBar from '@/components/file-element/file-card/progress-bar/progress-bar';
import { FileWithProgress } from '@/types/files';
import { useAtomValue, useSetAtom } from 'jotai';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { MdClose } from 'react-icons/md';
import { VscChromeMinimize } from 'react-icons/vsc';

type Props = {
  sortProgress?: {
    progress: number;
    isSort: boolean;
  };
};

export default function UploadedFileListHeader({ sortProgress }: Props) {
  //  const { progress, isSort } = sortProgress;
  const progress = sortProgress ? sortProgress.progress : 0;
  const isSort = sortProgress ? sortProgress.isSort : false;
  const files = useAtomValue(fileAtom);

  const uploadedFiles = useMemo(() => {
    return files.filter((file) => file?.progress === 100);
  }, [files]);

  const setMinimize = useSetAtom(minimizeFileListAtom);
  const setClose = useSetAtom(closeAtom);

  const average = (files: FileWithProgress[]) => {
    const total = files.reduce((acc, file) => acc + (file.progress ?? 0), 0);
    const avg = total / files.length;
    return avg;
  };

  return (
    <div className="flex flex-col items-center w-full px-6 sm:px-6">
      <div className="flex items-center w-full px-3 sm:px-5">
        <div className="flex-1">
          <span className="font-extrabold text-[#5347cf]">{uploadedFiles.length}</span>/{' '}
          {files.length}개 <span className="font-extrabold">완료</span>
        </div>
        <div className="flex items-center gap-3">
          {/* <VscChromeMinimize
            className="cursor-pointer hover:bg-gray-100"
            onClick={() => setMinimize(true)}
          /> */}
          <MdClose className="cursor-pointer hover:bg-gray-100" onClick={() => setClose(true)} />
        </div>
      </div>
      <ProgressBar progress={average(files)} />
    </div>
  );
}
