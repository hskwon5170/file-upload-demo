import LoadingSpinner from '@/components/loading-spinner/loading-spinner';
import { FaCheck } from 'react-icons/fa';
import { FaExclamation } from 'react-icons/fa6';
import { FaCrown } from 'react-icons/fa6';

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
