import { AiFillFile } from 'react-icons/ai';
import { animated, useSpring } from '@react-spring/web';
import { FileWithProgress } from '@/types/files';
import { BiSolidFileJpg } from 'react-icons/bi';
import { BiSolidFilePng } from 'react-icons/bi';
import { BiSolidFilePdf } from 'react-icons/bi';
import { IndexIconWithAction, StatusIcon } from './file-card-icons/file-card-icons';
import { useEffect, useRef, useState } from 'react';
import { useSetAtom } from 'jotai';
import { removeFileAtom } from '@/atom/files';
import { RxDragHandleDots2 } from 'react-icons/rx';

type Props = {
  file: FileWithProgress;
  standard: boolean;
  isDropTarget?: boolean;
  index?: number;
};

export default function FileCards({ file, standard, isDropTarget, index }: Props) {
  const removeFile = useSetAtom(removeFileAtom);

  // const fileExtension = file.file?.type.split('/')[1];

  const openSprings = useSpring({
    from: { opacity: 0.1, scale: 0.9, y: -20, rotate: -5 },
    to: { opacity: 1, scale: 1, y: 0, rotate: 0 },
    config: { duration: 50, tension: 200, friction: 15 },
  });

  // const openSprings = useSpring({
  //   from: { opacity: 0.05, scale: 0.9, x: -30 },
  //   to: { opacity: 1, scale: 1, x: 0 },
  //   config: { duration: 100, velocity: 10 },
  //   delay: 150,
  // });

  const iconSprings = useSpring({
    from: { transform: 'scale(0.8)', opacity: 0 },
    to: { transform: 'scale(1)', opacity: 1 },
    delay: 150,
    config: { tension: 200, friction: 15 },
  });

  const scaleAnimation = useSpring({
    transform: isDropTarget ? 'scale(1.1)' : 'scale(1)',
    // opacity: isDropTarget ? 0.5 : 1,
    backgroundColor: isDropTarget ? '#F8F0FF' : '#ffffff',
    // config: { tension: 300, friction: 10 },
    // config: { tension: 120, friction: 14 },
    config: { tension: 100, friction: 7 },
  });

  const fileCardRef = useRef<HTMLDivElement>(null);

  const [isHover, setIsHover] = useState(false);

  const handleMouseOver = () => {
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
  };

  useEffect(() => {
    fileCardRef.current?.addEventListener('mouseover', handleMouseOver);
    fileCardRef.current?.addEventListener('mouseout', handleMouseLeave);
    return () => {
      fileCardRef.current?.removeEventListener('mouseover', handleMouseOver);
      fileCardRef.current?.removeEventListener('mouseout', handleMouseLeave);
    };
  }, [fileCardRef]);

  return (
    <animated.div style={scaleAnimation}>
      <animated.div
        ref={fileCardRef}
        data-tooltip-id="my-tooltip"
        className=" flex items-center w-full h-12 gap-5 my-3 cursor-pointer  px-6  hover:bg-gray-100 duration-300 transition-all ease-in-out"
        style={openSprings}
      >
        <div className="flex items-center justify-center">
          <RxDragHandleDots2 className="text-xl text-gray-500" />
        </div>

        <IndexIconWithAction
          isHover={isHover}
          onClick={() => removeFile(file)}
          index={index as number}
        />
        <div className="flex items-center flex-1 w-72">
          <animated.div
            className="flex items-center justify-center p-2 bg-gray-100 rounded-lg w-10 h-10"
            style={iconSprings}
          >
            <AiFillFile className="w-8 h-8 text-gray-600" />
            {/* <FileIcon extension={fileExtension} /> */}
          </animated.div>
          <div className="p-2">
            <div className="flex items-center justify-between">
              <div className="flex flex-col p-3 gap-2">
                <div className="flex items-center gap-3">
                  <div className="font-bold text-sm truncate max-w-60">{file?.file.name}</div>
                </div>
                <div className="text-[10px] text-gray-500">{ConvertSize(file?.file.size)}</div>
              </div>
            </div>
          </div>
        </div>
        <StatusIcon progress={file?.progress ?? 0} isError={file?.isError ?? false} />
      </animated.div>
    </animated.div>
  );
}

const ConvertSize = (size: number) => {
  if (size >= 1024 * 1024) {
    return (size / 1024 / 1024).toFixed(2) + 'MB';
  } else {
    return (size / 1024).toFixed(2) + 'KB';
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
