import lottieJson from "./../../../public/file.json";
import Lottie from "react-lottie-player";

export default function FileDragActivePannel() {
  return (
    <div className="flex flex-col items-center text-gray-500">
      <div className="w-[250px] h-[250px]">
        <Lottie loop animationData={lottieJson} play />
      </div>

      <div className="font-bold text-xl">
        <span className="font-bold text-blue-600">파일</span>이 준비되었어요!
      </div>
      <div>파일을 여기에 끌어다 놓으면 파일이 업로드됩니다</div>
    </div>
  );
}
