import { LuDownload } from 'react-icons/lu';

export default function DownloadButton() {
  return (
    <div className="w-8 h-8 rounded-md bg-transparent text-gray-300 shadow-md flex justify-center items-center hover:bg-gray-500 cursor-pointer transition-all duration-300 ease-in-out">
      <LuDownload />
    </div>
  );
}
