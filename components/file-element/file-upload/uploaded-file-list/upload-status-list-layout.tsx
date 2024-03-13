'use client';

import { closeAtom, fileAtom } from '@/atom/files';
import { useAtomValue } from 'jotai';

type Props = {
  children: React.ReactNode;
};

export default function UploadStatusListLayout({ children }: Props) {
  const files = useAtomValue(fileAtom);
  const close = useAtomValue(closeAtom);
  return (
    <div>
      {files && files.length > 0 && !close && (
        <div className="w-screen h-screen bg-black bg-opacity-70 flex justify-center items-center absolute top-0 left-0 right-0 bottom-0">
          {children}
        </div>
      )}
    </div>
  );
}
