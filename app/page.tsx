import FileList from "@/components/file-element/file-list/file-list";
import FileModule from "@/components/file-element/file-upload/file-module";

export default async function Main() {
  const res = await fetch(`http://10.1.1.190:8084/api/files`);
  const files = await res.json();

  return (
    <>
      <FileModule />
      <FileList files={files.content} />
    </>
  );
}
