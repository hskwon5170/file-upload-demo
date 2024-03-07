import { CreateTaskGroup } from '@/action/create-task-group-action';
import { fileAtom } from '@/atom/files';
import type { FileWithProgress } from '@/types/files';
import axios from 'axios';
import { useAtom } from 'jotai';

const useUpload = () => {
  const [files, setFiles] = useAtom(fileAtom);

  const UploadFile = async (fileWithStatus: FileWithProgress, taskGroupId?: string) => {
    const formData = new FormData();
    formData.append('file', fileWithStatus?.file);

    try {
      await axios.post('http://10.1.1.190:8084/api/files/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (e) => {
          const percentCompleted = Math.round((e.loaded * 100) / e.total!);
          setFiles((prev) => {
            return prev.map((file) => {
              if (file.id === fileWithStatus?.id) {
                return { ...file, progress: percentCompleted };
              }
              return file;
            });
          });
        },
      });
      setFiles((prev) =>
        prev.map((file) =>
          file?.id === fileWithStatus?.id ? { ...file, status: 'done', progress: 100 } : file,
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

  // # 2. 생성된 Task Group Id와 개별 file에 대한 POST 요청
  const handleFileWithTaskGroup = async (file: FileWithProgress, taskGroupId: string) => {
    try {
      await fetch(`/file/task-group/${taskGroupId}/task`, {
        method: 'POST',
        body: JSON.stringify({
          id: taskGroupId,
          fileName: file.file.name,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.error('에러', error);
    }
  };

  const handleTaskGroup = async (files: FileWithProgress[]) => {
    // # 1. Task Group 생성
    const taskGroupId = await CreateTaskGroup();

    // # 2. 생성된 Task Group Id와 개별 file에 대한 POST 요청
    for (const file of files) {
      await handleFileWithTaskGroup(file, taskGroupId);
    }
  };

  return { UploadFile, handleTaskGroup };
};

export default useUpload;
