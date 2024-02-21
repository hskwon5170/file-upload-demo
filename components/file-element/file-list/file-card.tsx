'use client';
import { FileDto } from '@/types/files';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AiFillFile } from 'react-icons/ai';

export default function FileCard(
  { file }: { file: FileDto }, // onImageClick,
) {
  // onClick,
  // isPopup,
  // fileId,
  const { originalName, id, extensionType, width, height, displayUrl } = file;
  const router = useRouter();

  return (
    <div
      className="border-[1px] border-gray-200 rounded-xl shadow-lg w-full flex overflow-hidden cursor-pointer"
      onDoubleClick={() => router.push(`/preview/${id}`)}
    >
      <div
        className="flex items-center justify-center w-28 rounded-tl-xl rounded-bl-xl"
        onClick={() => router.push(`/preview/image/${id}`)}
      >
        {/* <img
            src={displayUrl}
            // src="https://mblogthumb-phinf.pstatic.net/MjAxOTA5MDlfMjM2/MDAxNTY4MDExNjU0NDcw.jdtDVxiHtslkLsi9D3XH5Cl1--yVYev8ZijHLhSinnIg.N_2eE5Ceb14CkurPa33rB8C5n0HKKNDhGeyt1WCRPIEg.PNG.cpasun/SE-2aa2e66a-f929-436e-a13e-9e8c5c4386cf.png?type=w800"
            alt={originalName}
            className="object-cover w-24 h-24 transition-transform duration-500 ease-in-out hover:scale-110"
            // onClick={() => onImageClick(id!)}
            id={String(file.id)}
          /> */}
        <AiFillFile className="w-[45px] h-[45px] text-gray-600" />
      </div>
      <div className="my-2">
        <div className="flex items-center p-1 text-gray-600 bg-gray-100 rounded-xl">
          <div className="inline-block p-1 text-md">{id}</div>
          <div className="border-[1px] border-gray-400 h-[20px] mx-2" />
          <div className="p-1 font-semibold ">{originalName}</div>
        </div>
      </div>
    </div>
  );
}
