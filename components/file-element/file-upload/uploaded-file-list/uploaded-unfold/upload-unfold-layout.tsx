'use client';

import { closeAtom, minimizeFileListAtom } from '@/atom/files';
import { useAtomValue } from 'jotai';

type Props = {
  children?: React.ReactNode;
};

export default function UploadUnfoldLayout({ children }: Props) {
  const minimize = useAtomValue(minimizeFileListAtom);
  const close = useAtomValue(closeAtom);
  return (
    <div className={`${close ? 'hidden' : null} `}>
      {/* <div>{header}</div> */}
      <div
        className={`flex flex-col items-center rounded-xl shadow-2xl py-3 h-[500px] w-[500px] overflow-hidden bg-white relative sm:w-full sm:h-screen
    ${minimize ? 'hidden' : ''}`}
      >
        {children}
      </div>
      {/* <div>{footer}</div> */}
    </div>
  );
}
