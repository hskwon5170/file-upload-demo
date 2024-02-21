import PreviewImageDetail from '@/app/preview/image/[fileId]/page';

type Props = {
  params: {
    fileId: number;
  };
};

type ImageData = {
  id: number;
  url: null | string;
  originalName: string;
  extensionType: string;
  uuid: string;
  height: number;
  width: number;
  fileCollection: null;
  displayUrl: string;
  indexStatus: 'SUCCESS';
  highlightCoordinate: HighlightCoordinate;
};

type HighlightCoordinate = {
  coordinateList: Array<{ x: number; y: number }>;
};

export default async function PreviewImageModal({ params }: Props) {
  const fileId = params.fileId;
  const response = await fetch(`http://10.1.1.190:8084/api/files/${fileId}`);
  const data: ImageData = await response.json();

  return (
    <div>
      <PreviewImageDetail displayUrl={data.displayUrl} />
    </div>
  );
}
