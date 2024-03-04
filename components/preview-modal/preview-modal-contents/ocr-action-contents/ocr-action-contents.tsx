import { SetStateAction, Suspense } from 'react';
import PdfPreview from '../../pdf-preview/pdf-preview';

type Props = {
  selectedPage: number;
};

export default function OcrActionContents({ selectedPage }: Props) {
  return (
    <div className="flex">
      <PdfPreview
        file="/files/file.pdf"
        size={50}
        selectedPage={selectedPage}
        isOcrPage
      />
      <div className="bg-white h-full w-[300px] text-black">
        asd asd asdasdasdas
      </div>
    </div>
  );
}
