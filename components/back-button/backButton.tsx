'use client';

import { useRouter } from 'next/navigation';
import { IoMdClose } from 'react-icons/io';

export default function BackButton() {
  const router = useRouter();
  return (
    <button
      className="w-8 h-8 font-bold  rounded-md bg-transparent text-gray-300 shadow-md flex justify-center items-center hover:bg-gray-500 cursor-pointer transition-all duration-300 ease-in-out"
      onClick={() => router.back()}
    >
      <IoMdClose />
    </button>
  );
}
