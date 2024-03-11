'use client';
import { useAtomValue } from 'jotai';
import UploadedFold from './uploaded-fold/uploaded-fold';
import UploadedUnfold from './uploaded-unfold/uploaded-unfold';
import { fileAtom } from '@/atom/files';

export default function UploadedFileList() {
  const files = useAtomValue(fileAtom);
  return (
    <div>
      {files && files.length > 0 && (
        <div className="w-screen h-screen bg-black bg-opacity-70 flex justify-center items-center absolute top-0 left-0 right-0 bottom-0">
          <UploadedFold />
          <div className="relative top-[5%]">
            <UploadedUnfold />
          </div>
        </div>
      )}
    </div>
  );
}
