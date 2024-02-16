import { useState } from "react";
import FileCard from "./fileCard";
import Link from "next/link";

export default function FileList({ files }: { files: any[] }) {
  //   const [changeView, setChangeView] = useState<boolean>(false);
  //   const [selectedItemId, setSelectedItemId] = useState<number>(0);
  //   const handleItemClick = (id: number) => {
  //     setSelectedItemId(id);
  //     setChangeView(!changeView);
  //   };
  return (
    <div>
      {files.map((file: any) => (
        <Link key={file.id} href={`/file/${file.id}`}>
          <div className="my-10 cursor-pointer">
            <FileCard
              file={file}
              // fileId={selectedItemId}
              // onImageClick={handleItemClick}
              // isPopup={changeView}
              //   onClick={onSelect}
            />
          </div>
        </Link>
      ))}
    </div>
  );
}
