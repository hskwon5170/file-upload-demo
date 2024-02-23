import FileDropZone from './file-dropzone/file-dropzone';

const text =
  '* 50MB 이하의 jpg, jpeg, png, pdf 파일만 업로드 할 수 있습니다. (최대 10개) ​';

export default function FileModule() {
  return (
    <div className="flex flex-col items-center gap-6 mb-20">
      <FileDropZone />
      <p className="text-gray-600">{text}</p>
    </div>
  );
}
