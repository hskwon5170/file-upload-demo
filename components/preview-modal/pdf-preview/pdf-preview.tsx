import {
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
  useRef,
} from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import styles from '../preview-modal.module.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

type Props = {
  file: string;
  size?: number;
  isPreview?: boolean;
  selectedPage: number;
  setSelectedPage: Dispatch<SetStateAction<number>>;
};

export default function PdfPreview({
  file,
  size = 600,
  isPreview = false,
  selectedPage,
  setSelectedPage,
}: Props) {
  console.log('selectedPage', selectedPage);

  const containerRef = useRef<HTMLDivElement>(null);

  const [numPages, setNumPages] = useState(0); // pdf 파일 총 페이지 수 onLoad시 저장
  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  useEffect(() => {
    const currentPage = containerRef.current?.querySelector(
      `[data-page-number="${selectedPage}"]`,
    );
    currentPage?.scrollIntoView({
      block: 'center',
    });
  }, [isPreview, selectedPage]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const pageNumber = parseInt(
              entry.target.getAttribute('data-page-number') || '1',
            );
            !isPreview && setSelectedPage(pageNumber);
          }
        });
      },
      { threshold: 1 },
    );
    const pages = containerRef.current?.querySelectorAll('.pdfpage');
    pages?.forEach((page) => observer.observe(page));

    return () => observer.disconnect();
  }, [isPreview, setSelectedPage, numPages]);

  return (
    <div
      id="scrollArea"
      ref={containerRef}
      className={`${styles['image-zone']} flex flex-col items-center max-h-[80vh] overflow-y-auto pr-6 py-5`}
    >
      <Document
        file={file}
        onLoadSuccess={onDocumentLoadSuccess}
        loading=""
      >
        {Array.from(new Array(numPages), (el, idx) => (
          <div key={idx + 1} className={`page_${idx + 1} my-2`}>
            {isPreview && <p className="text-white">{idx + 1}</p>}

            <Page
              className={`${idx === selectedPage - 1 && isPreview ? 'border-4 border-blue-500' : 'border-4 border-[#2e2e2f]'} ${!isPreview ? 'my-10' : null} cursor-pointer pdfpage`}
              pageNumber={idx + 1}
              height={size}
              onClick={() => isPreview && setSelectedPage(idx + 1)}
              renderAnnotationLayer={false}
              renderTextLayer={false}
              scale={1.2}
              loading=""
            />
          </div>
        ))}
      </Document>
    </div>
  );
}
