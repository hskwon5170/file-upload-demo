import { atom } from "jotai";

type FileWithProgress = {
  file: File;
  progress?: number;
  status: "uploading" | "done";
  id: number;
};

type ProgressAtomProps = {
  id: number;
  progress: number;
};

export const fileAtom = atom<FileWithProgress[]>([]);

export const progressAtom = atom<ProgressAtomProps[]>([]);

// export const removeFileAtom = atom(null, (get, set, file: File) => {
//   const files = get(fileAtom);
//   set(
//     fileAtom,
//     files.filter((f) => f.name !== file.name)
//   );
// });
