import { Dispatch, SetStateAction, useState, useEffect, useRef } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import styles from '../preview-modal.module.css';
import LoadingSpinner from '@/components/loading-spinner/loading-spinner';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

type Props = {
  file: string;
  size?: number;
  isPreview?: boolean;
  selectedPage: number;
  setSelectedPage?: Dispatch<SetStateAction<number>>;
  isOcrPage?: boolean;
};

export default function PdfPreview({
  file,
  size = 600,
  isPreview = false,
  selectedPage,
  setSelectedPage,
  isOcrPage = false,
}: Props) {
  console.log('selectedPage...', selectedPage);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isScroll, setIsScroll] = useState(false);
  const [numPages, setNumPages] = useState(0); // pdf 파일 총 페이지 수 onLoad시 저장

  const [pageLoaded, setPageLoaded] = useState(false);

  useEffect(() => {
    setPageLoaded(false);
  }, [setPageLoaded]);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

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
    const currentPage = containerRef.current?.querySelector(`[data-page-number="${selectedPage}"]`);
    currentPage?.scrollIntoView({
      // block: 'center',
      block: isPreview ? 'center' : 'start',
    });
  }, [isPreview, selectedPage]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // console.log('entries', entries);
        if (isScroll && !isPreview) {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.target instanceof HTMLElement) {
              const pageNumber = entry.target.dataset.pageNumber;
              !isPreview && setSelectedPage?.(Number(pageNumber));
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
  }, [isPreview, setSelectedPage, numPages, isScroll]);

  return (
    <div
      id="scrollArea"
      ref={containerRef}
      className={`${styles['image-zone']} ${isOcrPage ? '' : 'overflow-y-auto'} flex flex-col items-center max-h-[80vh]  pr-6 py-5`}
    >
      <Document file={file} onLoadSuccess={onDocumentLoadSuccess} loading="">
        {isOcrPage ? (
          <Page pageNumber={selectedPage} />
        ) : (
          <>
            {Array.from(new Array(numPages), (el, idx) => {
              {
                !pageLoaded && <LoadingSpinner />;
              }

              return (
                <div key={idx + 1} className={`page_${idx + 1} ${idx !== 0 && isPreview && 'my-10'}`}>
                  {isPreview && <p className="text-white font-bold">{idx + 1}</p>}
                  <Page
                    className={`${idx === selectedPage - 1 && isPreview ? 'border-4 border-blue-500' : 'border-4 border-[#2e2e2f]'} ${!isPreview ? 'my-10' : null} cursor-pointer pdfpage`}
                    pageNumber={idx + 1}
                    height={size}
                    onClick={() => isPreview && setSelectedPage?.(idx + 1)}
                    renderAnnotationLayer={false}
                    renderTextLayer={false}
                    scale={1.2}
                    loading=""
                    onLoadSuccess={() => setPageLoaded(true)}
                  />
                </div>
              );
            })}
          </>
        )}
      </Document>
    </div>
  );
}
