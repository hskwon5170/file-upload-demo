import { useState } from 'react';

export default function useLoadPdf() {
  const [numPages, setNumPages] = useState(0);
  const [pageRendered, setPageRendered] = useState(Array(numPages).fill(false));

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setPageRendered(Array(numPages).fill(false));
  };

  const handlePageRenderSuccess = (pageIndex: number) => {
    setPageRendered((prev) => prev.map((item, idx) => (idx === pageIndex ? true : item)));
  };

  return { numPages, pageRendered, onDocumentLoadSuccess, handlePageRenderSuccess };
}
