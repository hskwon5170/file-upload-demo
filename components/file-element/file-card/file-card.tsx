import { FcImageFile } from "react-icons/fc";
import { HiOutlineCheck } from "react-icons/hi";
export default function FileCards() {
  return (
    <div className="flex items-center w-[400px] justify-between p-3">
      <div className="flex flex-1 items-center">
        <FcImageFile className="w-[35px] h-[35px]" />
        <div className="flex flex-col ml-4">
          <div>emotion1.png</div>
          <div className="text-sm text-gray-700">3.5KB</div>
        </div>
      </div>
      <CheckIcon />
    </div>
  );
}

const CheckIcon = () => {
  return (
    <div className="flex justify-center items-center bg-[#03c73c] w-6 h-6 rounded-full">
      <HiOutlineCheck className="text-white" />
    </div>
  );
};
