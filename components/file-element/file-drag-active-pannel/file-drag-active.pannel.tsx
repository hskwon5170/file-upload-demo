import lottieJson from '@/public/file.json';
import Lottie from 'react-lottie-player';

export default function FileDragActivePannel() {
  return (
    <div className="flex flex-col items-center text-gray-500 -z-10">
      <div className="w-[120px] h-[120px] absolute top-0">
        <Lottie loop animationData={lottieJson} play />
      </div>
      <div className="absolute">
        <div className="font-bold text-2xl">
          <span className="font-bold text-blue-600">파일</span>이 준비되었어요!
        </div>
        <div className="my-1">파일을 여기에 끌어다 놓으면 파일 업로드가 바로 시작됩니다.</div>
      </div>
    </div>
  );
}
