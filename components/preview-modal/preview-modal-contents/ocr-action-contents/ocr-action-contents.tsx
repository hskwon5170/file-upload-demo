import { SetStateAction, Suspense } from 'react';
import PdfPreview from '../../pdf-preview/pdf-preview';
import PdfViewer from '../../pdf-viewer/pdf-viewer';

type Props = {
  selectedPage: number;
};

export default function OcrActionContents({ selectedPage }: Props) {
  return (
    <div className="flex">
      <PdfViewer file="/files/file.pdf" selectedPage={selectedPage} />
      <div className="bg-white h-full w-[300px] text-black">asd asd asdasdasdas</div>
    </div>
  );
}
