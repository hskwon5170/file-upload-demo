import { useRef, useEffect, useState } from 'react';
import useLoadPdf from '@/hooks/useLoadPdf';
import { Document, Page, pdfjs } from 'react-pdf';
import styles from './../preview-modal.module.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import LoadingSpinner from '@/components/loading-spinner/loading-spinner';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

type Props = {
  file: string;
  selectedPage: number;
  onChange: (page: number) => void;
};

export default function PdfViewer({ file, selectedPage, onChange }: Props) {
  const { numPages, pageRendered, onDocumentLoadSuccess, handlePageRenderSuccess } = useLoadPdf();
  const [isScroll, setIsScroll] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentPage = containerRef.current?.querySelector(`[data-page-number="${selectedPage}"]`);
    currentPage?.scrollIntoView({
      block: 'center',
    });
  }, [selectedPage]);

  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;
    const container = containerRef.current;

    const handleScroll = () => {
      setIsScroll(true);

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setIsScroll(false);
      }, 150);
    };

    container?.addEventListener('scroll', handleScroll);

    return () => {
      container?.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // console.log('entries', entries);
        if (isScroll) {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.target instanceof HTMLElement) {
              const pageNumber = entry.target.dataset.pageNumber;
              onChange(Number(pageNumber));
            }
          });
        }
      },
      { threshold: 0.7 },
    );
    const pages = containerRef.current?.querySelectorAll('.pdfpage');
    pages?.forEach((page) => observer.observe(page));

    return () => {
      observer.disconnect();
    };
  }, [numPages, isScroll, onChange]);

  return (
    <div
      ref={containerRef}
      className={`${styles['image-zone']} overflow-y-auto flex flex-col items-center max-h-[80vh] pr-6 py-5`}
    >
      <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
        {Array.from(new Array(numPages), (_, idx) => (
          <div key={idx} className="relative my-10 flex justify-center items-center">
            {!pageRendered[idx] && (
              <div className="absolute inset-0 flex justify-center items-center z-50">
                <LoadingSpinner large />
              </div>
            )}
            <Page
              className={'cursor-pointer pdfpage'}
              height={600}
              renderAnnotationLayer={false}
              renderTextLayer={false}
              pageNumber={idx + 1}
              loading={<></>}
              onRenderSuccess={() => handlePageRenderSuccess(idx)}
            />
          </div>
        ))}
      </Document>
    </div>
  );
}
