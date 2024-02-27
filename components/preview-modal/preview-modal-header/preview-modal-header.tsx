import BackButton from '@/components/back-button/backButton';
import OcrButton from '../ocr-button';
import DownloadButton from '../download-button';
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
        <OcrButton />
        <DownloadButton />
        {/* <ZoomButton zoom={zoom} onClick={onClickZoomIn} /> */}
      </div>
    </section>
  );
}
