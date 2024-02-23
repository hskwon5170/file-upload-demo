'use client';

import {
  closeAtom,
  fileAtom,
  minimizeFileListAtom,
  removeFileAtom,
} from '@/atom/files';
import { useAtomValue } from 'jotai';
import UploadedFileListHeader from '../uploaded-file-list-header/uploaded-file-list-header';
import FileCards from '@/components/file-element/file-card/file-card';
import styles from './uploded-unfold.module.css';
import Button from '../buttons/buttons';

export default function UploadedUnfold() {
  const files = useAtomValue(fileAtom);
  const minimize = useAtomValue(minimizeFileListAtom);
  const close = useAtomValue(closeAtom);
  // const removeFile = useSetAtom(removeFileAtom);

  if (!files) return null;
  if (!files.length) return null;

  const buttonSectionHeight = '80px';

  return (
    <div className={`${close ? 'hidden' : null}`}>
      <div
        className={`flex flex-col items-center border rounded-xl py-3 h-[500px] w-[500px] overflow-hidden bg-white relative
  ${minimize ? 'hidden' : ''}`}
      >
        <section className="w-full bg-white border-b-[1px]">
          <UploadedFileListHeader />
        </section>
        <section
          className={`w-full px-10 overflow-y-auto ${styles['list']}`}
          style={{
            maxHeight: `calc(100% - ${buttonSectionHeight} - 5.3rem)`,
          }}
        >
          {files.map((file, idx) => {
            const standard = idx === 0;
            return (
              <div key={file.id}>
                <FileCards file={file} standard={standard} />
                {/* <span onClick={() => removeFile(file)}>x</span> */}
              </div>
            );
          })}
        </section>

        <section className="absolute bottom-0 flex flex-col items-start w-full h-24 gap-3 overflow-hidden bg-white border-t-[1px]">
          <div className="w-full px-10 pt-3">
            <div className="flex gap-3">
              <input type="checkbox" id="check" />
              <label htmlFor="check">순서대로 PDF 자동 병합</label>
            </div>
            <div className="flex gap-3 mt-2">
              <Button className="text-black bg-white">
                파일 추가
              </Button>
              <Button className="text-white bg-blue-500">
                자동분류
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
