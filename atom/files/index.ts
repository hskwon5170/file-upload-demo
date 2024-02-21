import { atom } from 'jotai';
import type { FileWithProgress, ProgressAtomProps } from '@/types/files';

export const fileAtom = atom<FileWithProgress[]>([]);
export const progressAtom = atom<ProgressAtomProps[]>([]);
export const minimizeFileListAtom = atom(false);
export const closeAtom = atom(false);

export const removeFileAtom = atom(null, (get, set, paramFile: FileWithProgress) => {
  const files = get(fileAtom);
  set(
    fileAtom,
    files.filter((f) => f.id !== paramFile.id),
  );
});
