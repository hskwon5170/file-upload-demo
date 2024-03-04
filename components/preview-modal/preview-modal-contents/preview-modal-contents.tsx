'use client';
import { useState } from 'react';
import PdfPreview from '../pdf-preview/pdf-preview';
import { useAtom } from 'jotai';
import { ocrActionAtom } from '@/atom/pdf-viewer';
import OcrActionContents from './ocr-action-contents/ocr-action-contents';

export default function PreviewModalContents() {
  const [selectedPage, setSelectedPage] = useState(1);
  const [isOcrAction, setIsOcrAction] = useAtom(ocrActionAtom);
  return (
    <div className="flex px-3">
      <section className="w-[250px] flex flex-col items-center">
        <PdfPreview
          file="/files/file.pdf"
          size={60}
          isPreview
          selectedPage={selectedPage}
          setSelectedPage={setSelectedPage}
        />
      </section>

      <section className="flex-1">
        {isOcrAction ? (
          <OcrActionContents selectedPage={selectedPage} />
        ) : (
          <PdfPreview
            file="/files/file.pdf"
            size={500}
            selectedPage={selectedPage}
            setSelectedPage={setSelectedPage}
          />
        )}
      </section>
    </div>
  );
}
