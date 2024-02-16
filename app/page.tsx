import FileList from "@/components/fileList";

export default async function Page() {
  const res = await fetch(`http://10.1.1.190:8084/api/files`, {
    next: { revalidate: 3600 },
  });
  const files = await res.json();

  return (
    <>
      <FileList files={files.content} />
    </>
  );
}
