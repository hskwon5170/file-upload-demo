import FileDropZone from "./file-dropzone/file-dropzone";
import UploadedFileList from "./uploaded-file-list/uploaded-file-list";

export default function FileModule() {
  return (
    <>
      <FileDropZone />
      <UploadedFileList />
    </>
  );
}
