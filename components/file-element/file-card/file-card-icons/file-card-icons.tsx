import LoadingSpinner from '@/components/loading-spinner/loading-spinner';
import { FaCheck } from 'react-icons/fa';
import { FaExclamation } from 'react-icons/fa6';
import { FaCrown } from 'react-icons/fa6';
import { MdClose } from 'react-icons/md';

export const StatusIcon = ({ progress, isError }: { progress: number; isError: boolean }) => {
  return (
    <div className="flex items-center justify-center">
      {progress === 100 && (
        <div className="flex justify-center items-center bg-[#03c73c] w-5 h-5 rounded-full p-1">
          <FaCheck className="text-white" />
        </div>
      )}

      {progress < 100 && !isError && <LoadingSpinner />}

      {isError && (
        <div className="flex items-center justify-center w-5 h-5 font-extrabold bg-red-500 rounded-full p-1">
          <FaExclamation className="text-white" />
        </div>
      )}
    </div>
  );
};

export const CrownIcon = ({ standard }: { standard: boolean }) => {
  return (
    <>
      {standard ? (
        <div className="w-5 h-5">
          <FaCrown />
        </div>
      ) : (
        <div className="w-5 h-5"></div>
      )}
    </>
  );
};

export const IndexIconWithAction = ({
  isHover,
  onClick,
  index,
}: {
  isHover: boolean;
  onClick: () => void;
  index: number;
}) => {
  return (
    <div className="w-2 flex items-center justify-center cursor-pointer">
      {isHover ? (
        <div
          onClick={onClick}
          className="text-gray-500 bg-gray-200 w-5 h-5 rounded-full flex justify-center items-center p-1"
        >
          <MdClose />
        </div>
      ) : (
        <p className="text-gray-500">{(index ?? 0) + 1}</p>
      )}
    </div>
  );
};
