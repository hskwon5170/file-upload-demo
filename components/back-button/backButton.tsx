"use client";

import { useRouter } from "next/navigation";
import { IoMdClose } from "react-icons/io";

export default function BackButton() {
  const router = useRouter();
  return (
    <button
      className="bg-gray-200 w-8 h-8 rounded-md border-none shadow-md flex justify-center items-center"
      onClick={() => router.back()}
    >
      <IoMdClose />
    </button>
  );
}
