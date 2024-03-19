import { FileWithProgress } from '@/types/files';
import UploadedFileListHeader from '../uploaded-file-list-header/uploaded-file-list-header';
import { useMemo } from 'react';

type Props = {
  sortProgress?: {
    progress: number;
    isSort: boolean;
  };
  ocrFailedExists: boolean;
  files: FileWithProgress[];
};

export default function ModalHeader({ sortProgress, ocrFailedExists, files }: Props) {
  const handleDragStart = <T,>(e: React.DragEvent<T>) => {
    e.preventDefault();
  };

  const extractFailedFileLength = useMemo(
    () => files.filter((file) => file.isOcrFailed).length,
    [files],
  );

  if (ocrFailedExists) {
    return (
      <section className="flex flex-col items-start gap-3 mb-3 select-none sm:px-12">
        <div className="text-indigo-700 font-bold flex items-center gap-3">
          <p className="text-lg">자동 분류 실패</p>
          <div className="bg-indigo-700 w-5 h-5 text-sm rounded-full flex justify-center items-center p-2 text-white">
            {extractFailedFileLength}
          </div>
        </div>
        <div className="text-red-500 text-sm my-2 underline decoration-1 tracking-wide underline-offset-2">
          <div>
            자동 분류에 실패한 파일이 있습니다. <br className="hidden sm:block" />
            해당 파일은 업로드 되지 않습니다.
          </div>
          <div>자동 분류 실패 사유를 확인하고 다시 업로드를 시도해주세요.</div>
        </div>
      </section>
    );
  }

  return (
    <section
      className="w-full bg-white border-b-[1px] select-none"
      onDragStart={handleDragStart<HTMLDivElement>}
    >
      <UploadedFileListHeader sortProgress={sortProgress} />
    </section>
  );
}
