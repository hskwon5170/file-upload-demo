'use client';
import { useState } from 'react';
import PdfPreview from '../pdf-preview/pdf-preview';
import { useAtom } from 'jotai';
import { ocrActionAtom, pdfDocumentLoadedAtom, selectedPageAtom } from '@/atom/pdf-viewer';
import OcrActionContents from './ocr-action-contents/ocr-action-contents';
import PdfThumbnails from '../pdf-thumbnails/pdf-thumbnails';
import PdfViewer from '../pdf-viewer/pdf-viewer';

export default function PreviewModalContents() {
  // const [selectedPage, setSelectedPage] = useState(1);
  // const [isOcrAction, setIsOcrAction] = useAtom(ocrActionAtom);
  const [selectedPage, setSelectedPage] = useAtom(selectedPageAtom);
  const [isOcrAction] = useAtom(ocrActionAtom);
  console.log('selectedPage 업데이트', selectedPage);
  const [pdfDocumentLoaded] = useAtom(pdfDocumentLoadedAtom);

  const handlePages = (page: number) => {
    setSelectedPage(page);
  };

  return (
    // <div className="flex px-3">
    //   <section className="w-[250px] flex flex-col items-center">
    //     {/* <PdfPreview
    //       file="/files/file.pdf"
    //       size={60}
    //       isPreview
    //       selectedPage={selectedPage}
    //       setSelectedPage={setSelectedPage}
    //     /> */}
    //     <PdfThumbnails file="/files/file.pdf" onClick={handlePages} selectedPage={selectedPage} />
    //   </section>

    //   <section className="flex-1">
    //     {isOcrAction ? (
    //       <OcrActionContents selectedPage={selectedPage} />
    //     ) : (
    //       <PdfViewer file="/files/file.pdf" selectedPage={selectedPage} onChange={handlePages} />
    //     )}

    //     {/* <PdfPreview
    //       file="/files/file.pdf"
    //       size={500}
    //       selectedPage={selectedPage}
    //       setSelectedPage={setSelectedPage}
    //     /> */}
    //   </section>
    // </div>
    <div className="flex px-3">
      <section className="w-[250px] flex flex-col items-center">
        <PdfThumbnails file="/files/file.pdf" onClick={handlePages} selectedPage={selectedPage} />
      </section>
      <section className={`flex-1 ${isOcrAction ? 'flex gap-6' : ''}`}>
        {/* {isOcrAction ? (
          <OcrActionContents selectedPage={selectedPage} />
        ) : ( */}
        <div className={`flex-1 ${isOcrAction ? 'bg-white' : ''}`}>
          <PdfViewer
            file="/files/file.pdf"
            selectedPage={selectedPage}
            isOcrAction={isOcrAction}
            onChange={handlePages}
          />
        </div>
        {/* )} */}
        {isOcrAction && (
          <div className="flex-1 w-full h-full bg-white text-xl text-black font-bold flex justify-center items-center">
            <div
              style={{ width: '533px', height: '300px' }}
              className="border-2 flex justify-center items-center bg-gray-100"
            >
              ocr text page
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
