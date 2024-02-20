import { atom } from "jotai";
import type { FileWithProgress, ProgressAtomProps } from "@/types/files";

export const fileAtom = atom<FileWithProgress[]>([]);

export const progressAtom = atom<ProgressAtomProps[]>([]);

// export const removeFileAtom = atom(null, (get, set, file: File) => {
//   const files = get(fileAtom);
//   set(
//     fileAtom,
//     files.filter((f) => f.name !== file.name)
//   );
// });

export const minimizeFileListAtom = atom(false);
