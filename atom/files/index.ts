import { atom } from 'jotai';
import type { FileWithProgress, ProgressAtomProps } from '@/types/files';

export const fileAtom = atom<FileWithProgress[]>([]);
export const removeFileAtom = atom(null, (get, set, paramFile: FileWithProgress) => {
  const files = get(fileAtom);
  set(
    fileAtom,
    files.filter((f) => f.id !== paramFile.id),
  );
});
export const progressAtom = atom<ProgressAtomProps[]>([]);
export const minimizeFileListAtom = atom(false);
export const closeAtom = atom(false);

export const fileExploreTriggerAtom = atom(false);

export const isOrderChangeAtom = atom(false);
export const isBlankSpaceDragAtom = atom(false);
export const shouldShowDragPanel = atom(false);

export const ocrFailStatusAtom = atom(false);
