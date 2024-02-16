"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();
  return (
    <button
      className="bg-gray-100 w-8 h-8 rounded-md border-none shadow-md"
      onClick={() => router.back()}
    >
      {"<"}
    </button>
  );
}
