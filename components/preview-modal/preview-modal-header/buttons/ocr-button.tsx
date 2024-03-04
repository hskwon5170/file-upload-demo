'use client';

import { ocrActionAtom } from '@/atom/pdf-viewer';
import { useSetAtom } from 'jotai';

export default function OcrButton() {
  const setOcrAction = useSetAtom(ocrActionAtom);
  return (
    <button
      onClick={() => setOcrAction(true)}
      className="h-8 px-5 bg-transparent text-gray-300 hover:bg-gray-600 focus:ring-4 focus:ring-gray-500 font-medium rounded-lg text-sm leading-tight uppercase transition duration-150 ease-in-out"
    >
      OCR 텍스트 변환
    </button>
  );
}
