import FileCard from './file-card';
import { FileDto } from '@/types/files';

export default function FileList({ files }: { files: FileDto[] }) {
  return (
    <div>
      {files.map((file) => (
        <div key={file.id} className="my-10 cursor-pointer">
          <FileCard file={file} />
        </div>
      ))}
    </div>
  );
}
