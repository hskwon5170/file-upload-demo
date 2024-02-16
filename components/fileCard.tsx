interface FileCardProps {
  file: any;
  // onImageClick: (e: number) => void;
  // onClick?(id: string): void;
  // isPopup?: boolean;
  // fileId: number;
}

export default function FileCard({
  file,
}: // onImageClick,
// onClick,
// isPopup,
// fileId,
FileCardProps) {
  const { originalName, id, extensionType, width, height, displayUrl } = file;

  return (
    <div
      className="border-[1px] border-gray-200 rounded-xl shadow-lg w-full flex overflow-hidden"
      // onClick={() => onClick?.(id?.toString() ?? '')}
    >
      <div className="flex-none w-28  rounded-tl-xl rounded-bl-xl">
        <img
          src={displayUrl}
          // src="https://mblogthumb-phinf.pstatic.net/MjAxOTA5MDlfMjM2/MDAxNTY4MDExNjU0NDcw.jdtDVxiHtslkLsi9D3XH5Cl1--yVYev8ZijHLhSinnIg.N_2eE5Ceb14CkurPa33rB8C5n0HKKNDhGeyt1WCRPIEg.PNG.cpasun/SE-2aa2e66a-f929-436e-a13e-9e8c5c4386cf.png?type=w800"
          alt={originalName}
          className="object-cover w-24 h-24 hover:scale-110 transition-transform ease-in-out duration-500"
          // onClick={() => onImageClick(id!)}
          id={String(file.id)}
        />
      </div>
      <div className="my-2">
        <div className="flex items-center p-2 bg-gray-100 rounded-xl text-gray-600">
          <div className="text-md  inline-block p-1">{id}</div>
          <div className="border-[1px] border-gray-400 h-[20px] mx-2" />
          <div className=" font-semibold p-1">{originalName}</div>
        </div>
      </div>
    </div>
  );
}
