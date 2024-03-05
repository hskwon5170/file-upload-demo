import useLoadPdf from '@/hooks/useLoadPdf';
import { Document, Page, pdfjs } from 'react-pdf';
import styles from './../preview-modal.module.css';
import { useEffect, useRef } from 'react';
import LoadingSpinner from '@/components/loading-spinner/loading-spinner';

type Props = {
  file: string;
  onClick: (page: number) => void;
  selectedPage: number;
};

export default function PdfThumbnails({ file, onClick, selectedPage }: Props) {
  const { numPages, pageRendered, onDocumentLoadSuccess, handlePageRenderSuccess } = useLoadPdf();

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentPage = containerRef.current?.querySelector(`[data-page-number="${selectedPage}"]`);
    currentPage?.scrollIntoView({
      block: 'center',
    });
  }, [selectedPage]);
  return (
    <div
      ref={containerRef}
      className={`${styles['image-zone']} overflow-y-auto flex flex-col items-center max-h-[80vh] pr-6 py-5`}
    >
      <Document file={file} onLoadSuccess={onDocumentLoadSuccess} loading={<></>}>
        {Array.from(new Array(numPages), (_, idx) => (
          <div key={idx}>
            <p className="text-white font-bold my-3">{idx + 1}</p>
            <div className="my-3 relative flex justify-center items-center">
              {!pageRendered[idx] && (
                <div className="absolute inset-0 flex justify-center items-center z-50">
                  <LoadingSpinner />
                </div>
              )}
              <Page
                className={`pdfpage cursor-pointer border-4  ${idx === selectedPage - 1 ? 'border-blue-600' : 'border-[#2e2e2f]'}`}
                height={80}
                onClick={() => onClick(idx + 1)}
                renderAnnotationLayer={false}
                renderTextLayer={false}
                pageNumber={idx + 1}
                loading={<></>}
                onRenderSuccess={() => handlePageRenderSuccess(idx)}
              />
            </div>
          </div>
        ))}
      </Document>
    </div>
  );
}
