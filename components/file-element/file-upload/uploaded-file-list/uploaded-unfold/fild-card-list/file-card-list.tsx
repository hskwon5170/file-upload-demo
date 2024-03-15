import FileCards from '@/components/file-element/file-card/file-card';
import { useFileOrderChange } from '@/hooks/useFileOrderChange';
import type { FileWithProgress } from '@/types/files';

type Props = {
  files: FileWithProgress[];
  ocrFailedExists: boolean;
};

export default function FileCardList({ files, ocrFailedExists }: Props) {
  const { onDragStart, onDragOver, onDrop, onDragLeave, onDragEnd, dropTargetIndex } =
    useFileOrderChange({ ocrFailedExists });

  return (
    <>
      {files.map((file, idx) => (
        <li
          key={file?.id}
          className="list-none draggable"
          draggable={ocrFailedExists ? false : true}
          data-position={idx}
          onDragStart={onDragStart}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          onDragEnd={onDragEnd}
        >
          <FileCards
            file={file}
            isDropTarget={idx === dropTargetIndex}
            index={idx}
            ocrFailedExists={ocrFailedExists}
          />
        </li>
      ))}
    </>
  );
}
