"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();
  return (
    <button
      className="bg-gray-100 w-10 h-10 rounded-xl border-none shadow-md"
      onClick={() => router.back()}
    >
      X
    </button>
  );
}
