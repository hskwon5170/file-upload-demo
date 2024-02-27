import { SetStateAction, useState, useEffect, useRef } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import styles from '../preview-modal.module.css';
import LoadingSpinner from '@/components/loading-spinner/loading-spinner';

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
    setNumPages(numPages);
  }

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
      <Document
        file={file}
        onLoadSuccess={onDocumentLoadSuccess}
        loading=""
      >
        {Array.from(new Array(numPages), (el, idx) => (
          <div key={idx + 1} className={`page_${idx + 1} my-2`}>
            {isPreview && <p className="text-white">{idx + 1}</p>}

            <Page
              className={`${idx === selectedPage - 1 && isPreview ? 'border-4 border-blue-500' : 'border-4 border-[#2e2e2f]'} ${!isPreview ? 'my-10' : null} cursor-pointer`}
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
    // ==
    // <div
    //   className={`${styles['image-zone']} flex flex-col items-center max-h-[80vh] overflow-y-auto pr-6 py-5`}
    // >
    //   {isDocumentLoading ? (
    //     <div className="flex justify-center items-center h-full">
    //       <LoadingSpinner />
    //     </div>
    //   ) : (
    //     <Document
    //       file={file}
    //       onLoadSuccess={onDocumentLoadSuccess}
    //       onLoadError={onDocumentLoadError}
    //     >
    //       {Array.from(new Array(numPages), (el, idx) => (
    //         <div key={idx + 1} className={`page_${idx + 1} my-2`}>
    //           {isPreview && <p className="text-white">{idx + 1}</p>}

    //           <Page
    //             className={`${idx === selectedPage - 1 && isPreview ? 'border-4 border-blue-500' : 'border-4 border-[#2e2e2f]'} ${!isPreview ? 'my-10' : ''} cursor-pointer`}
    //             pageNumber={idx + 1}
    //             height={size}
    //             onClick={() => isPreview && setSelectedPage(idx + 1)}
    //             renderAnnotationLayer={false}
    //             renderTextLayer={false}
    //             scale={1.2}
    //             onRenderSuccess={() => handlePageRender(idx + 1)}
    //           />
    //         </div>
    //       ))}
    //     </Document>
    //   )}
    // </div>
  );
}
