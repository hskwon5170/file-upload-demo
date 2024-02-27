import styles from './preview-modal.module.css';
import PdfViewer from './pdf-preview/pdf-preview';
import PreviewModalHeader from './preview-modal-header/preview-modal-header';
import PdfPreview from './pdf-preview/pdf-preview';
import PdfZoomed from './pdf-zoomed/pdf-zoomed';
import PreviewModalContents from './preview-modal-contents/preview-modal-contents';

type Root = {
  data: ImageData;
};

type HighlightCoordinate = {
  coordinateList: Array<{ x: number; y: number }>;
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

export default function PreviewModal({ data }: Root) {
  // useEffect(() => {
  //   // 모달이 마운트될 때 body의 overflow를 hidden으로 설정
  //   document.body.style.overflow = 'hidden';

  //   return () => {
  //     // 컴포넌트가 언마운트될 때 원래 상태로 복구
  //     document.body.style.overflow = '';
  //   };
  // }, []);

  const { originalName, displayUrl } = data;

  // const [zoom, setZoom] = useState(false);
  // const onClickZoomIn = () => {
  //   setZoom(!zoom);
  // };

  return (
    <>
      <div className="bg-black bg-opacity-80 fixed z-10 left-0 top-0 w-screen h-screen flex justify-center">
        <div className="relative w-screen h-screen">
          <PreviewModalHeader title={originalName} />
          <PreviewModalContents />
        </div>
      </div>
    </>
  );
}
