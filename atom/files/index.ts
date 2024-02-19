import { atom } from "jotai";

export const fileAtom = atom<File[]>([]);

export const removeFileAtom = atom(null, (get, set, file: File) => {
  const files = get(fileAtom);
  set(
    fileAtom,
    files.filter((f) => f.name !== file.name)
  );
});
