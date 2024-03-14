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
      const response = await axios.post('http://10.1.1.190:8084/api/files/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (e) => {
          const percentCompleted = Math.round((e.loaded * 100) / e.total!);

          setFiles((prev) => {
            return prev.map((file) => {
              return file.id === fileWithStatus?.id
                ? { ...file, progress: percentCompleted }
                : file;
            });
          });
        },
      });

      // 업로드가 모두 끝나고 file status를 done으로 변경
      setFiles((prev) =>
        prev.map((file) =>
          file?.id === fileWithStatus?.id ? { ...file, status: 'done', progress: 100 } : file,
        ),
      );
      return response;
    } catch (e) {
      setFiles((prev) => {
        return prev.map((file) => {
          return file.id === fileWithStatus?.id
            ? { ...file, status: 'error', progress: 0, isError: true }
            : file;
        });
      });
    }
  };

  // # 중요
  // # 2. 생성된 Task Group Id와 개별 file에 대한 POST 요청
  // # 2-1. Task Group 생성하는 1번 단계에서 axios의 onUploadProgress를 이용해서 프로그레스바를 표현해야함
  const handleFileWithTaskGroup = async (fileWithStatus: FileWithProgress, taskGroupId: string) => {
    const formData = new FormData();
    formData.append('file', fileWithStatus.file);

    try {
      await axios.post(`/file/task-group/${taskGroupId}/task`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (e) => {
          const percentCompleted = Math.round((e.loaded * 100) / e.total!);

          setFiles((prev) => {
            return prev.map((prev_file) =>
              prev_file.id === fileWithStatus?.id
                ? { ...prev_file, progress: percentCompleted }
                : prev_file,
            );
          });
        },
      });

      setFiles((prev) =>
        prev.map((prev_file) =>
          prev_file.id === fileWithStatus?.id
            ? { ...prev_file, status: 'done', progress: 100 }
            : prev_file,
        ),
      );
    } catch (error) {
      setFiles((prev) =>
        prev.map((prev_file) =>
          prev_file.id === fileWithStatus?.id
            ? { ...prev_file, status: 'error', progress: 0, isError: true }
            : prev_file,
        ),
      );
    }
  };

  // # 1. Task Group 생성
  const handleTaskGroup = async (file: FileWithProgress) => {
    const taskGroupId = await CreateTaskGroup();

    // ## 중요 ##
    // # 2. 생성된 Task Group Id와 개별 file에 대한 POST 요청
    // # 2-1. Task Group 생성하는 1번 단계에서 axios의 onUploadProgress를 이용해서 프로그레스바를 표현해야함
    // for (const file of files) {

    // 생성한 태스크 그룹 아이디를 개별 파일에 할당하여 POST 요청하기
    await handleFileWithTaskGroup(file, taskGroupId);

    // (선택적) PDF 병합
    await handleMergeFiles(taskGroupId);

    // OCR 정보 추출
    await handleExtractOcr(taskGroupId, file);

    // S3, DB 업로드
    await uploadFiles(taskGroupId);
    // }
  };

  // # Optional. 파일 병합
  const handleMergeFiles = async (taskGroupId: string) => {
    try {
      await fetch(`/file/task-group/${taskGroupId}/merge`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.error('에러', error);
    }
  };

  // # 3. OCR 추출하기
  const handleExtractOcr = async (taskGroupId: string, file: FileWithProgress) => {
    try {
      await fetch(`/file/task-group/${taskGroupId}/ocr`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error: any) {
      // console.error('에러', error);
      setFiles((prev) =>
        prev.map((prev_file) =>
          prev_file.id === file.id
            ? { ...prev_file, isOcrFailed: true, ocrFailedMessage: error.message }
            : prev_file,
        ),
      );
    }
  };

  const uploadFiles = async (taskGroupId: string) => {
    try {
      await fetch(`/file/task-group/${taskGroupId}/upload`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      // console.error('에러', error);
    }
  };

  return { UploadFile, handleTaskGroup, handleMergeFiles, handleExtractOcr };
};

export default useUpload;
