import { fileAtom } from '@/atom/files';
import { useAtom } from 'jotai';
import type { FileWithProgress } from '@/types/files';
import { useCallback } from 'react';

const timeStamp = new Date().getTime();
const isFileAlreadyUploaded = (newFile: File, uploadedFileArray: FileWithProgress[]) => {
  return uploadedFileArray.some(
    (f) =>
      f.file.name === newFile.name &&
      f.file.size === newFile.size &&
      f.file.lastModified === newFile.lastModified,
  );
};

const useHandleFile = () => {
  const [files, setFiles] = useAtom(fileAtom);

  const checkAlreadyUploaded = useCallback(
    async (newFile: File) => {
      const fileWithStatus: FileWithProgress = {
        file: newFile,
        progress: 0,
        status: 'uploading',
        id: timeStamp + newFile.lastModified,
        isError: false,
      };

      const isAlreadyUploaded = isFileAlreadyUploaded(newFile, files);

      if (isAlreadyUploaded) {
        const confirm = window.confirm(
          `${newFile.name}은 이미 업로드된 파일입니다. 다시 업로드하시겠습니까?`,
        );
        if (!confirm) return;

        setFiles((prev) =>
          prev.map((prev_file) =>
            prev_file.id === fileWithStatus.id ? fileWithStatus : prev_file,
          ),
        );
      } else {
        setFiles((prev) => [...prev, fileWithStatus]);
      }
      return fileWithStatus;
    },
    [files, setFiles],
  );
  return { checkAlreadyUploaded };
};

export default useHandleFile;
