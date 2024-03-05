import { numPagesAtom, pdfLoadPagesAtom, pdfLoadStatusAtom } from '@/atom/pdf-viewer';
import { useAtom } from 'jotai';
import { useState } from 'react';

export default function useLoadPdf() {
  const [numPages, setNumPages] = useAtom(numPagesAtom);
  const [, setPageRendered] = useAtom(pdfLoadPagesAtom);
  const [pdfLoadedStatus, setPdfLoadedStatus] = useAtom(pdfLoadStatusAtom);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setPageRendered('UPDATE');
  };

  const handlePageRenderSuccess = (pageIndex: number) => {
    setPdfLoadedStatus((prev) => prev.map((item, idx) => (idx === pageIndex ? true : item)));
  };

  return { numPages, pdfLoadedStatus, onDocumentLoadSuccess, handlePageRenderSuccess };
}
