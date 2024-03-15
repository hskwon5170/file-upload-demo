import LoadingSpinner from '@/components/loading-spinner/loading-spinner';
import { useSpring, animated } from '@react-spring/web';
import { FaCheck } from 'react-icons/fa';
import { FaExclamation } from 'react-icons/fa6';
import { MdClose } from 'react-icons/md';

type Props = {
  progress: number;
  isError: boolean;
  ocrFailedExists: boolean;
};

export const StatusIcon = ({ progress, isError, ocrFailedExists }: Props) => {
  if (ocrFailedExists) {
    return <ErrorIcon />;
  }

  return (
    <>
      {progress === 100 && <SuccessIcon />}
      {progress < 100 && !isError && <LoadingSpinner />}
      {isError && <ErrorIcon />}
    </>
  );
};

const SuccessIcon = () => {
  return (
    <div className="flex justify-center items-center bg-[#03c73c] w-5 h-5 rounded-full p-1">
      <FaCheck className="text-white" />
    </div>
  );
};

const ErrorIcon = () => {
  return (
    <div className="flex items-center justify-center w-5 h-5 font-extrabold bg-red-500 rounded-full p-1">
      <FaExclamation className="text-white" />
    </div>
  );
};

export const IndexIconWithAction = ({
  isHover,
  onClick,
  index,
  ocrFailedExists,
}: {
  isHover: boolean;
  onClick: () => void;
  index: number;
  ocrFailedExists: boolean;
}) => {
  if (ocrFailedExists) return null;
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
