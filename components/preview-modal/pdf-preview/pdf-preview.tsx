import { SetStateAction, useState, useEffect, useRef } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
// import './pdf-viewer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import styles from '../preview-modal.module.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

interface Props {
  file: string;
  size?: number;
  isPreview?: boolean;
  selectedPage: number;
  setSelectedPage: React.Dispatch<SetStateAction<number>>;
}

export default function PdfPreview({
  file,
  size = 600,
  isPreview = false,
  selectedPage,
  setSelectedPage,
}: Props) {
  const [numPages, setNumPages] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    console.log('numPages', numPages);
    setNumPages(numPages);
  }

  // if (isZoom) return (
  //       <Document file={file}>
  //         <Page pageNumber={selectedPage}></Page>
  //       </Document>
  // )
  console.log('selectedPage 프롭스', selectedPage);

  useEffect(() => {
    if (!isPreview && containerRef.current) {
      const currentPage = containerRef.current.querySelector(
        `[data-page-number="${selectedPage}"]`,
      );
      if (currentPage) {
        currentPage.scrollIntoView({
          block: 'center',
        });
      }
    }
  }, [selectedPage, isPreview]);

  return (
    <div
      ref={containerRef}
      className={`${styles['image-zone']} flex flex-col items-center max-h-[80vh] overflow-y-auto pr-6 py-5`}
    >
      <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
        {Array.from(new Array(numPages), (el, idx) => (
          <div key={idx + 1} className={`page_${idx + 1} my-2`}>
            {isPreview && <p className="text-white">{idx + 1}</p>}

            <Page
              className={`cursor-pointer ${idx === selectedPage - 1 && isPreview ? 'border-4 border-blue-500' : 'border-4 border-[#2e2e2f]'} ${!isPreview ? 'my-10' : ''}`}
              pageNumber={idx + 1}
              height={size}
              onClick={() => isPreview && setSelectedPage(idx + 1)}
            />
          </div>
        ))}
      </Document>
    </div>
  );
}
