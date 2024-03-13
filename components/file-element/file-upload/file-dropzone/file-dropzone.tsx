'use client';
import { closeAtom, fileExploreTriggerAtom } from '@/atom/files';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { useRef, useEffect } from 'react';
import { IoMdCloudUpload } from 'react-icons/io';
import useUpload from '@/hooks/useUpload';
import useHandleFile from '@/hooks/useHandleFile';
import type { FileWithProgress } from '@/types/files';

export default function FileDropZone() {
  const inputRef = useRef<HTMLInputElement>(null);
  const setClose = useSetAtom(closeAtom);

  const { UploadFile } = useUpload();
  const { checkAlreadyUploaded } = useHandleFile();

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setClose(false);
    const fileArray = e.target.files;
    if (!fileArray) return;

    for (const SelectedFiles of Array.from(fileArray)) {
      console.log('SelectedFiles', SelectedFiles);
      // if (!['image/jpeg', 'application/pdf'].includes(fileWithStatus.file.type)) {
      //   alert('지원하지 않는 파일 형식입니다.');
      //   return null;
      // }
      const handledFile = await checkAlreadyUploaded(SelectedFiles);
      UploadFile(handledFile as FileWithProgress);
    }
  };

  const openFileExplorer = () => {
    if (inputRef.current) {
      inputRef.current.value = '';
      inputRef.current.click();
    }
  };

  // 업로드 상태 모듈에서 파일 추가 버튼 클릭
  const [trigger, setTrigger] = useAtom(fileExploreTriggerAtom);
  useEffect(() => {
    if (trigger) {
      openFileExplorer();
    }
    setTrigger(false);
  }, [trigger, setTrigger]);

  return (
    <div className="flex items-center justify-center">
      <div>
        <form
          className="bg-gray-100 p-4 w-[800px] rounded-2xl min-h-[14rem] text-center flex flex-col items-center justify-center cursor-pointer border-2"
          onClick={openFileExplorer}
        >
          <input
            ref={inputRef}
            onChange={handleFileSelect}
            placeholder="fileInput"
            type="file"
            multiple={true}
            accept=".xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf"
            hidden
          />
          <div className="flex flex-col items-center justify-center gap-3 text-gray-500">
            <IoMdCloudUpload className="text-[60px]" />
            <div className="my-6 text-2xl font-bold">파일을 업로드하세요</div>
          </div>
        </form>
      </div>
    </div>
  );
}
