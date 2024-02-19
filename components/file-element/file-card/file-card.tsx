import { AiFillFile } from "react-icons/ai";
import { FaCheck } from "react-icons/fa";

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
    <div className="flex items-center w-full justify-between p-3">
      <div className="flex flex-1 items-center">
        <div className="w-[50px] h-[50px] bg-gray-200 p-2 rounded-md">
          <AiFillFile className="w-[35px] h-[35px] text-gray-600" />
        </div>
        <div className="flex flex-col ml-4">
          <div className="w-[250px] whitespace-nowrap overflow-hidden truncate">
            {file?.file.name}
          </div>
          <div className="text-[13px] text-gray-500">
            {ConvertBytesToKilobytes(file?.file.size)}
          </div>
        </div>
      </div>
      <StatusIcon progress={file?.progress ?? 0} />
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

const ConvertBytesToKilobytes = (bytes: number) => {
  return (bytes / 1024).toFixed(2) + "KB";
};

const Spinner = () => {
  return (
    <div
      className="animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent text-gray-400 rounded-full"
      role="status"
      aria-label="loading"
    ></div>
  );
};
