import { useSetAtom } from 'jotai';
import Button from '../../buttons/buttons';
import { closeAtom } from '@/atom/files';

type Props = {
  isLoading: boolean;
  openFileExplorer: (val: boolean) => void;
  handleSort: () => void;
  ocrFailedExists: boolean;
};

export default function ModalFooter({
  isLoading,
  openFileExplorer,
  handleSort,
  ocrFailedExists,
}: Props) {
  const handleDragStart = <T,>(e: React.DragEvent<T>) => {
    e.preventDefault();
  };

  const setClose = useSetAtom(closeAtom);

  if (ocrFailedExists) {
    return (
      <div className="flex h-full items-center justify-center select-none">
        <Button onClick={() => setClose(true)} className="text-white bg-indigo-700 w-40">
          확인
        </Button>
      </div>
    );
  }

  return (
    <section className="flex h-full items-center justify-center w-full gap-3 bg-white select-none">
      <div className="w-full px-10">
        <div
          className="flex items-center gap-3 my-3 ml-1"
          onDragStart={handleDragStart<HTMLDivElement>}
        >
          <input type="checkbox" id="check" className="w-4 h-4 accent-[#5347cf]" />
          <label htmlFor="check" className="cursor-pointer">
            순서대로 PDF 일괄 병합
          </label>
        </div>
        <div className="flex gap-3 mt-2">
          <Button
            isLoading={isLoading}
            onClick={() => openFileExplorer(true)}
            className="text-black bg-white hover:bg-gray-100"
          >
            파일 추가
          </Button>
          {/* <Button className="text-white bg-[#5347cf]">PDF 일괄 병합</Button> */}
          <Button isLoading={isLoading} onClick={handleSort} className="text-white bg-[#5347cf]">
            자동분류
          </Button>
        </div>
      </div>
    </section>
  );
}