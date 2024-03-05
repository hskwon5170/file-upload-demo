'use client';
import { useState } from 'react';
import PdfPreview from '../pdf-preview/pdf-preview';
import { useAtom } from 'jotai';
import { ocrActionAtom } from '@/atom/pdf-viewer';
import OcrActionContents from './ocr-action-contents/ocr-action-contents';
import PdfThumbnails from '../pdf-thumbnails/pdf-thumbnails';
import PdfViewer from '../pdf-viewer/pdf-viewer';

export default function PreviewModalContents() {
  const [selectedPage, setSelectedPage] = useState(1);
  const [isOcrAction, setIsOcrAction] = useAtom(ocrActionAtom);

  const handlePages = (page: number) => {
    setSelectedPage(page);
  };

  return (
    <div className="flex px-3">
      <section className="w-[250px] flex flex-col items-center">
        {/* <PdfPreview
          file="/files/file.pdf"
          size={60}
          isPreview
          selectedPage={selectedPage}
          setSelectedPage={setSelectedPage}
        /> */}
        <PdfThumbnails file="/files/file.pdf" onClick={handlePages} selectedPage={selectedPage} />
      </section>

      <section className="flex-1">
        <PdfViewer file="/files/file.pdf" selectedPage={selectedPage} onChange={handlePages} />

        {/* {isOcrAction ? (
          <OcrActionContents selectedPage={selectedPage} />
        ) : ( */}
        {/* <PdfPreview
          file="/files/file.pdf"
          size={500}
          selectedPage={selectedPage}
          setSelectedPage={setSelectedPage}
        /> */}
        {/* )} */}
      </section>
    </div>
  );
}
