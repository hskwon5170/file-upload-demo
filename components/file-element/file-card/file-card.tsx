import { AiFillFile } from "react-icons/ai";
import { FaCheck } from "react-icons/fa";
import ProgressBar from "./progress-bar/progress-bar";

type Props = {
  file: FileWithProgress;
};

type FileWithProgress = {
  file: File;
  progress?: number;
  status: "uploading" | "done";
};

export default function FileCards({ file }: Props) {
  console.log("file", file);
  return (
    <div className="flex w-full my-4">
      <div className="flex justify-center items-center p-4 bg-gray-100 rounded-lg">
        <AiFillFile className="w-[50px] h-[50px] text-gray-600" />
      </div>
      <div className="flex-1  p-2">
        <div className="flex items-center justify-between">
          <div className="flex flex-col p-2">
            <div className="font-bold truncate max-w-[250px]">
              {file?.file.name}
            </div>
            <div className="text-[13px] text-gray-500">
              {ConvertBytesToMegabytes(file?.file.size)}
            </div>
            <ProgressBar progress={file.progress ?? 0} />
          </div>
          <div className="flex items-center justify-center p-2 ">
            <StatusIcon progress={file?.progress ?? 0} />
          </div>
        </div>
      </div>
    </div>
  );
}

const StatusIcon = ({ progress }: { progress: number }) => {
  return (
    <>
      {progress === 100 && (
        <div className="flex justify-center items-center bg-[#03c73c] w-6 h-6 rounded-full">
          <FaCheck className="text-white" />
        </div>
      )}

      {progress < 100 && <Spinner />}
    </>
  );
};
const ConvertBytesToMegabytes = (bytes: number) => {
  return (bytes / 1024 / 1024).toFixed(2) + "MB";
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
