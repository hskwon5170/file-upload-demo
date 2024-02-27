import { AiFillFile } from 'react-icons/ai';
import { FaCheck } from 'react-icons/fa';
import { animated, useSpring } from '@react-spring/web';
import { FaExclamation } from 'react-icons/fa6';
import { FileWithProgress } from '@/types/files';
import { FaCrown } from 'react-icons/fa6';
import { BiSolidFileJpg } from 'react-icons/bi';
import { BiSolidFilePng } from 'react-icons/bi';
import { BiSolidFilePdf } from 'react-icons/bi';
import LoadingSpinner from '@/components/loading-spinner/loading-spinner';

type Props = {
  file: FileWithProgress;
  standard: boolean;
};

export default function FileCards({ file, standard }: Props) {
  const fileExtension = file.file?.type.split('/')[1];
  // console.log('fileExtension', fileExtension);
  const openSprings = useSpring({
    from: { transform: 'translateY(-20px)', opacity: 0, scale: 0.95 },
    to: { transform: 'translateY(0px)', opacity: 1, scale: 1 },
    config: { duration: 300 },
  });

  const iconSprings = useSpring({
    from: { transform: 'scale(0.8)', opacity: 0 },
    to: { transform: 'scale(1)', opacity: 1 },
    delay: 150,
    config: { tension: 200, friction: 15 },
  });
  return (
    <animated.div
      className="flex items-center w-full gap-5 my-3"
      style={openSprings}
    >
      <CrownIcon standard={standard} />
      <div className="flex items-center flex-1 w-72">
        <animated.div
          className="flex items-center justify-center p-2 bg-gray-100 rounded-lg w-12 h-12"
          style={iconSprings}
        >
          <AiFillFile className="w-8 h-8 text-gray-600" />
          {/* <FileIcon extension={fileExtension} /> */}
        </animated.div>
        <div className="p-2">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-2 p-2">
              <div className="font-bold truncate max-w-60">
                {file?.file.name}
              </div>
              <div className="text-[13px] text-gray-500">
                {ConvertBytes(file?.file.size)}
              </div>
            </div>
          </div>
        </div>
      </div>
      <StatusIcon
        progress={file?.progress ?? 0}
        isError={file?.isError ?? false}
      />
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

const CrownIcon = ({ standard }: { standard: boolean }) => {
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

const ConvertBytes = (bytes: number) => {
  if (bytes >= 1024 * 1024) {
    return (bytes / 1024 / 1024).toFixed(2) + 'MB';
  } else {
    return (bytes / 1024).toFixed(2) + 'KB';
  }
};

// jpg, png, pdf
const FileIcon = ({ extension }: { extension: string }) => {
  if (extension === 'jpg' || extension === 'jpeg') {
    return <BiSolidFileJpg className="w-11 h-11 text-gray-600" />;
  }

  if (extension === 'png') {
    return <BiSolidFilePng className="w-11 h-11 text-gray-600" />;
  }

  if (extension === 'pdf') {
    return <BiSolidFilePdf className="w-11 h-11 text-gray-600" />;
  }

  return <AiFillFile className="w-11 h-11 text-gray-600" />;
};
