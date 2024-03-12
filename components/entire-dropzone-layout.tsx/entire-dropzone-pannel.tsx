import lottieJson from '@/public/file.json';
import Lottie from 'react-lottie-player';

type Props = { isModal?: boolean };

export default function EntireDropzonePannel({ isModal }: Props) {
  return (
    <div className="flex flex-col items-center justify-center text-gray-500 mb-10">
      <div>
        <Lottie loop animationData={lottieJson} play style={isModal ? modalStyle : defaultStyle} />
      </div>
      <div className="flex flex-col items-center gap-3">
        <div className={`font-bold ${isModal ? 'text-2xl' : 'text-3xl'}`}>
          <span className="font-extrabold text-blue-600">파일</span>이 준비되었어요!
        </div>
        <div className={`my-1 ${isModal ? 'text-lg' : 'text-xl'}`}>
          파일을 여기에 끌어다 놓으면 파일 업로드가 바로 시작됩니다.
        </div>
      </div>
    </div>
  );
}

const modalStyle = {
  width: '250px',
  height: '250px',
};

const defaultStyle = {
  width: '400px',
  height: '400px',
};
