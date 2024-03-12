'use client';
import { useAtom, useAtomValue } from 'jotai';
import UploadedUnfold from './uploaded-unfold/uploaded-unfold';
import { closeAtom, fileAtom } from '@/atom/files';
import EntireDropzoneLayout from '@/components/entire-dropzone-layout.tsx/entire-dropzone-layout';

export default function UploadedFileList() {
  const files = useAtomValue(fileAtom);
  const [close, setClose] = useAtom(closeAtom);

  return (
    <div>
      {files && files.length > 0 && !close && (
        <div className="w-screen h-screen bg-black bg-opacity-70 flex justify-center items-center absolute top-0 left-0 right-0 bottom-0">
          {/* <UploadedFold /> */}
          <EntireDropzoneLayout isModal>
            <div className="relative right-10 bottom-10">
              <UploadedUnfold />
            </div>
          </EntireDropzoneLayout>
        </div>
      )}
    </div>
  );
}
