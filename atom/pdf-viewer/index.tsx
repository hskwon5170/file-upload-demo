import { atom } from 'jotai';

export const ocrActionAtom = atom(false);

export const selectedPageAtom = atom(1);
export const pdfDocumentLoadedAtom = atom(false);

export const numPagesAtom = atom(0);
export const pdfLoadStatusAtom = atom<boolean[]>([]);

export const pdfLoadPagesAtom = atom(null, (get, set, action: 'UPDATE') => {
  const numPages = get(numPagesAtom);
  if (action === 'UPDATE') {
    set(pdfLoadStatusAtom, Array(numPages).fill(false));
  }
});
