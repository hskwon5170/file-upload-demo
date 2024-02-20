import { useState } from "react";
import FileCard from "./file-card";
import { FileDto } from "@/types/files";

export default function FileList({ files }: { files: FileDto[] }) {
  //   const [changeView, setChangeView] = useState<boolean>(false);
  //   const [selectedItemId, setSelectedItemId] = useState<number>(0);
  //   const handleItemClick = (id: number) => {
  //     setSelectedItemId(id);
  //     setChangeView(!changeView);
  //   };
  return (
    <div>
      {files.map((file) => (
        <div key={file.id} className="my-10 cursor-pointer">
          <FileCard
            file={file}
            // fileId={selectedItemId}
            // onImageClick={handleItemClick}
            // isPopup={changeView}
            //   onClick={onSelect}
          />
        </div>
      ))}
    </div>
  );
}
