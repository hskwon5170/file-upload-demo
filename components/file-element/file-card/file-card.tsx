import { AiFillFile } from "react-icons/ai";
import { FaCheck } from "react-icons/fa";
import ProgressBar from "./progress-bar/progress-bar";
import { animated, useSpring } from "@react-spring/web";
import { FaExclamation } from "react-icons/fa6";
import { FileWithProgress } from "@/types/files";

export default function FileCards({ file }: { file: FileWithProgress }) {
  const openSprings = useSpring({
    from: { transform: "translateY(-20px)", opacity: 0, scale: 0.95 },
    to: { transform: "translateY(0px)", opacity: 1, scale: 1 },
    config: { duration: 300 },
  });

  const iconSprings = useSpring({
    from: { transform: "scale(0.8)", opacity: 0 },
    to: { transform: "scale(1)", opacity: 1 },
    delay: 150,
    config: { tension: 200, friction: 15 },
  });
  return (
    <animated.div className="flex w-full my-4" style={openSprings}>
      <animated.div
        className="flex justify-center items-center p-4 bg-gray-100 rounded-lg"
        style={iconSprings}
      >
        <AiFillFile className="w-[50px] h-[50px] text-gray-600" />
      </animated.div>
      <div className="flex-1  p-2">
        <div className="flex items-center justify-between">
          <div className="flex flex-col p-2 gap-2">
            <div className="font-bold truncate max-w-[250px]">
              {file?.file.name}
            </div>
            <div className="text-[13px] text-gray-500">
              {ConvertBytes(file?.file.size)}
            </div>
            <ProgressBar
              progress={file?.progress ?? 0}
              isError={file.isError ?? false}
            />
          </div>
          <div className="flex items-center justify-center p-2 ">
            <StatusIcon
              progress={file?.progress ?? 0}
              isError={file?.isError ?? false}
            />
          </div>
        </div>
      </div>
    </animated.div>
  );
}

const StatusIcon = ({
  progress,
  isError,
}: {
  progress: number;
  isError: boolean;
}) => {
  return (
    <>
      {progress === 100 && (
        <div className="flex justify-center items-center bg-[#03c73c] w-6 h-6 rounded-full">
          <FaCheck className="text-white" />
        </div>
      )}

      {progress < 100 && !isError && <Spinner />}

      {isError && (
        <div className="flex justify-center items-center bg-red-500 w-6 h-6 rounded-full font-extrabold">
          <FaExclamation className="text-white" />
        </div>
      )}
    </>
  );
};
const ConvertBytes = (bytes: number) => {
  // return (bytes / 1024 / 1024).toFixed(2) + "MB";
  if (bytes >= 1024 * 1024) {
    return (bytes / 1024 / 1024).toFixed(2) + "MB";
  } else {
    return (bytes / 1024).toFixed(2) + "KB";
  }
};

const Spinner = () => {
  return (
    <div
      className="animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent text-gray-400 rounded-full"
      role="status"
      aria-label="loading"
    />
  );
};
