'use client';
import { useAtom } from 'jotai';
import { ocrActionAtom, selectedPageAtom } from '@/atom/pdf-viewer';
import PdfThumbnails from '../pdf-thumbnails/pdf-thumbnails';
import PdfViewer from '../pdf-viewer/pdf-viewer';
import PreviewModalLayout from './preview-modal-layout/preview-modal-layout';

export default function PreviewModalContents() {
  const [selectedPage, setSelectedPage] = useAtom(selectedPageAtom);
  const [isOcrAction] = useAtom(ocrActionAtom);
  const handlePages = (page: number) => {
    setSelectedPage(page);
  };

  return (
    <div className="flex px-3">
      <section className="w-[250px] flex flex-col items-center">
        <PdfThumbnails
          file="/files/file.pdf"
          onClick={handlePages}
          selectedPage={selectedPage}
          isOcrAction={isOcrAction}
        />
      </section>
      <section className={`flex-1 ${isOcrAction ? 'flex gap-1' : ''}`}>
        <div className={`flex-1`}>
          {/* {isOcrAction ? (
            <PreviewModalLayout title="선택한 파일" btnTitle="텍스트 변환">
              <PdfViewer
                file="/files/file.pdf"
                selectedPage={selectedPage}
                isOcrAction={isOcrAction}
                onChange={handlePages}
              />
            </PreviewModalLayout>
          ) : (
            <PdfViewer
              file="/files/file.pdf"
              selectedPage={selectedPage}
              isOcrAction={isOcrAction}
              onChange={handlePages}
            />
          )} */}
          <PdfViewer
            file="/files/file.pdf"
            selectedPage={selectedPage}
            isOcrAction={isOcrAction}
            onChange={handlePages}
          />
        </div>
        {isOcrAction && (
          <div className="flex-1 w-full h-full bg-gray-100 flex justify-center items-center">
            <PreviewModalLayout title="텍스트 추출 결과" btnTitle=".txt 다운로드">
              <div
                style={{ width: '533px', height: '300px' }}
                className="flex justify-center items-center bg-gray-200 shadow-md"
              >
                텍스트를 추출하세요
              </div>
            </PreviewModalLayout>
          </div>
        )}
      </section>
    </div>
  );
}
