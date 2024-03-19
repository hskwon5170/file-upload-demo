'use client';
import { fileExploreTriggerAtom } from '@/atom/files';
import { useSetAtom } from 'jotai';
import { GoPlus } from 'react-icons/go';

export default function Page() {
  const openFileExplorer = useSetAtom(fileExploreTriggerAtom);

  return (
    <div
      onClick={() => openFileExplorer(true)}
      className="flex justify-center items-center size-10 bg-indigo-600 rounded-full p-1 text-white text-2xl font-bold"
    >
      <GoPlus />
    </div>
  );
}
