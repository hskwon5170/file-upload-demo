import lottieJson from '@/public/file.json';
import Lottie from 'react-lottie-player';

export default function EntireDropzonePannel() {
  return (
    <div className="flex flex-col items-center text-gray-500 mb-10">
      <div className="w-[400px] h-[400px]">
        <Lottie loop animationData={lottieJson} play />
      </div>
      <div className="flex flex-col items-center gap-3">
        <div className="font-bold text-3xl">
          <span className="font-extrabold text-blue-600">파일</span>이
          준비되었어요!
        </div>
        <div className="my-1 text-xl">
          파일을 여기에 끌어다 놓으면 파일 업로드가 바로 시작됩니다.
        </div>
      </div>
    </div>
  );
}
