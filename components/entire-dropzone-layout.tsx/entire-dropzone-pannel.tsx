import lottieJson from '@/public/file.json';
import Lottie from 'react-lottie-player';

export default function EntireDropzonePannel() {
  return (
    <div className="flex flex-col items-center text-gray-500">
      <div className="w-[400px] h-[400px] ">
        <Lottie loop animationData={lottieJson} play />
      </div>
      <div className="absolute bottom-28 flex flex-col items-center">
        <div className="font-bold text-2xl">
          <span className="font-bold text-blue-600">파일</span>이
          준비되었어요!
        </div>
        <div className="my-1 text-lg">
          파일을 여기에 끌어다 놓으면 파일 업로드가 바로 시작됩니다.
        </div>
      </div>
    </div>
  );
}
