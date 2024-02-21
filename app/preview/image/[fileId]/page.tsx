'use client';

import { useRouter } from 'next/navigation';

type Props = {
  displayUrl: string;
};

export default function PreviewImageDetail(props: Props) {
  const { displayUrl } = props;
  const router = useRouter();
  return (
    <div
      className="group bg-gray-100 w-[180px] h-[180px] border-2 rounded-xl relative cursor-pointer overflow-hidden"
      onClick={() => router.back()}
    >
      <div className="absolute inset-0 transition duration-300 bg-black bg-opacity-0 group-hover:bg-opacity-90"></div>
      <img
        src={displayUrl}
        alt="preview"
        className="absolute object-contain w-full h-full transition-opacity duration-300 group-hover:opacity-50"
      />
      <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 opacity-0 group-hover:opacity-100">
        <span className="text-2xl text-white">X</span>
      </div>
    </div>
  );
}
