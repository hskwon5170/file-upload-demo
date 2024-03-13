import UploadedUnfold from './uploaded-unfold/uploaded-unfold';
import EntireDropzoneLayout from '@/components/entire-dropzone-layout.tsx/entire-dropzone-layout';
import UploadStatusListLayout from './upload-status-list-layout';

export default function UploadStatusList() {
  return (
    <UploadStatusListLayout>
      <EntireDropzoneLayout isModal>
        <div className="relative right-10 bottom-10">
          <UploadedUnfold />
        </div>
      </EntireDropzoneLayout>
    </UploadStatusListLayout>
  );
}
