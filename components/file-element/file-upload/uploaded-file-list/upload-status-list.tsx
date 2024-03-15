import FileModalUnfold from './uploaded-unfold/file-modal-unfold';
import EntireDropzoneLayout from '@/components/entire-dropzone-layout.tsx/entire-dropzone-layout';
import UploadStatusListLayout from './upload-status-list-layout';

export default function UploadStatusList() {
  return (
    <UploadStatusListLayout>
      <EntireDropzoneLayout isModal>
        <div className="relative right-10 bottom-10">
          <FileModalUnfold />
        </div>
      </EntireDropzoneLayout>
    </UploadStatusListLayout>
  );
}
