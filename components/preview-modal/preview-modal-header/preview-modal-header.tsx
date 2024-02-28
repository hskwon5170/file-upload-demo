import BackButton from '@/components/back-button/backButton';
import OcrButton from './buttons/ocr-button';
import DownloadButton from './buttons/download-button';
import ZoomButtons from './buttons/zoom-buttons';

type Props = {
  title: string;
};

export default function PreviewModalHeader({ title }: Props) {
  return (
    <section className="flex w-full h-[80px] justify-between items-center bg-black bg-opacity-30 px-3 backdrop-blur-xl">
      <BackButton />
      <div className="text-gray-200 text-lg max-w-[350px] truncate">
        {title}
      </div>
      <div className="flex gap-3 items-center">
        <ZoomButtons />
        <OcrButton />
        <DownloadButton />
      </div>
    </section>
  );
}
