import { fileAtom } from '@/atom/files';
import type { FileWithProgress } from '@/types/files';
import axios from 'axios';
import { useAtom } from 'jotai';

const useUpload = () => {
  const [files, setFiles] = useAtom(fileAtom);
  const UploadFile = async (fileWithStatus: FileWithProgress) => {
    const formData = new FormData();
    formData.append('file', fileWithStatus?.file);

    try {
      await axios.post(
        'http://10.1.1.190:8084/api/files/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: (e) => {
            const percentCompleted = Math.round(
              (e.loaded * 100) / e.total!,
            );
            setFiles((prev) => {
              return prev.map((file) => {
                if (file.id === fileWithStatus?.id) {
                  return { ...file, progress: percentCompleted };
                }
                return file;
              });
            });
          },
        },
      );
      setFiles((prev) =>
        prev.map((file) =>
          file?.id === fileWithStatus?.id
            ? { ...file, status: 'done', progress: 100 }
            : file,
        ),
      );
    } catch (e) {
      setFiles((prev) => {
        return prev.map((file) => {
          if (file.id === fileWithStatus?.id) {
            return {
              ...file,
              status: 'error',
              progress: 0,
              isError: true,
            };
          } else {
            return file;
          }
        });
      });
    }
  };

  return { UploadFile };
};

export default useUpload;
