import FileDropZone from './file-dropzone/file-dropzone';

export default function FileModule() {
  return (
    <div className="mb-20 sm:hidden">
      <FileDropZone />
    </div>
  );
}
