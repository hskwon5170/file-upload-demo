'use client';

import { useAtom } from 'jotai';
import ZoomButtons from '../buttons/zoom-buttons';
import OcrButton from '../buttons/ocr-button';
import DownloadButton from '../buttons/download-button';
import PreviousButton from '../buttons/previous-button';
import { ocrActionAtom } from '@/atom/pdf-viewer';

export default function NavRightSection() {
  const [isOcrAction, setIsOcrAction] = useAtom(ocrActionAtom);

  return (
    <div className="flex gap-3 items-center justify-end flex-1">
      {isOcrAction ? (
        <PreviousButton onClick={() => setIsOcrAction(false)} />
      ) : (
        <>
          <ZoomButtons />
          <OcrButton />
          <DownloadButton />
        </>
      )}
    </div>
  );
}
