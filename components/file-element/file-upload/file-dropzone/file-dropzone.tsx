'use client';
import { closeAtom, fileExploreTriggerAtom } from '@/atom/files';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { useRef, useEffect } from 'react';
import { IoMdCloudUpload } from 'react-icons/io';
import useUpload from '@/hooks/useUpload';
import useHandleFile from '@/hooks/useHandleFile';
import cloud_icon from '@/public/cloud.png';
import type { FileWithProgress } from '@/types/files';
import Image from 'next/image';
import Button from '../uploaded-file-list/buttons/buttons';

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

  const onClickButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    openFileExplorer();
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
    <div>
      <div>
        <form
          // onClick={openFileExplorer}
          className="bg-white p-4 rounded-2xl min-h-[14rem] text-center flex flex-col items-center justify-center border-[1px] border-[#5d51d2] shadow-2xl"
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
            {/* <IoMdCloudUpload className="text-[60px]" /> */}
            <Image src={cloud_icon} alt="logo" priority />
            <div className="text-md text-[#5d51d2] font-bold">여기에 파일을 업로드 해주세요.</div>
            <p className="text-sm text-[#5d51d2] font-normal">{text}</p>
            <Button onClick={onClickButton} className="text-white bg-[#5d51d2] w-52 my-10">
              파일업로드
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

const text = '* 50MB 이하의 Jpg, Jpeg, Png, Pdf 파일만 업로드 할 수 있습니다. (최대 10개) ​';
