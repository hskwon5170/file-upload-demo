import EntireDropzoneLayout from '@/components/entire-dropzone-layout.tsx/entire-dropzone-layout';
import FileList from '@/components/file-element/file-list/file-list';
import FileModule from '@/components/file-element/file-upload/file-module';

export default async function Main() {
  // const res = await fetch(`http://10.1.1.190:8084/api/files`);
  // const files = await res.json();

  return (
    <EntireDropzoneLayout>
      <FileModule />
      {/* <FileList files={files.content} /> */}
    </EntireDropzoneLayout>
  );
}
