import {
  HiArrowsPointingOut,
  HiArrowsPointingIn,
  HiOutlineXMark,
} from "react-icons/hi2";

type Props = {
  zoom: boolean;
  onClick?: () => void;
};
export default function ZoomButton({ zoom, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      className="bg-gray-200 w-8 h-8 rounded-md flex justify-center items-center font-bold cursor-pointer hover:scale-125 hover:duration-300 hover:transition-all"
    >
      {!zoom ? <HiArrowsPointingOut /> : <HiArrowsPointingIn />}
    </div>
  );
}
