import { FileWithProgress } from '@/types/files';
import SortFallback from '../sort-fallback/sort-fallback';
import FileCardList from '../file-card-list/file-card-list';
import styles from '../uploded-unfold.module.css';

type Props = {
  isLoading: boolean;
  files: FileWithProgress[];
  ocrFailedExists: boolean;
};

export default function ModalMain({ isLoading, files, ocrFailedExists }: Props) {
  return (
    <section
      className={`w-full relative px-4 min-h-[300px] overflow-y-auto overflow-x-hidden border-t-[1px] border-b-[1px] ${styles['list']}`}
      style={{
        maxHeight: `calc(100% - ${buttonSectionHeight} - 4rem)`,
      }}
    >
      {isLoading && (
        <div className="absolute z-50 top-0 left-0 backdrop-blur-md bg-gray-300 bg-opacity-50 w-full">
          <SortFallback />
        </div>
      )}
      <FileCardList files={files} ocrFailedExists={ocrFailedExists} />
    </section>
  );
}

const buttonSectionHeight = '80px';
