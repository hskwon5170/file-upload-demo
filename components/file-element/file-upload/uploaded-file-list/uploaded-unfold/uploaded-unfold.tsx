'use client';

import {
  closeAtom,
  fileAtom,
  fileExploreTriggerAtom,
  minimizeFileListAtom,
} from '@/atom/files';
import { useAtomValue, useSetAtom } from 'jotai';
import UploadedFileListHeader from '../uploaded-file-list-header/uploaded-file-list-header';
import FileCards from '@/components/file-element/file-card/file-card';
import styles from './uploded-unfold.module.css';
import Button from '../buttons/buttons';
import { useState } from 'react';
import SortFallback from './sort-fallback/sort-fallback';

export default function UploadedUnfold() {
  const files = useAtomValue(fileAtom);
  const minimize = useAtomValue(minimizeFileListAtom);
  const close = useAtomValue(closeAtom);
  const setTrigger = useSetAtom(fileExploreTriggerAtom);
  const [isLoading, setIsLoading] = useState(false);
  // const removeFile = useSetAtom(removeFileAtom);
  console.log('files', files);
  console.log('isLoading', isLoading);
  const handleSortButton = () => {
    setIsLoading(true);

    new Promise((resolve) => {
      setTimeout(resolve, 4000);
    }).finally(() => setIsLoading(false));
  };

  if (!files) return null;
  if (!files.length) return null;

  return (
    <div className={`${close ? 'hidden' : null}`}>
      <div
        className={`flex flex-col items-center border rounded-xl shadow-2xl py-3 h-[500px] w-[500px] overflow-hidden bg-white relative
  ${minimize ? 'hidden' : ''}`}
      >
        <section className="w-full bg-white border-b-[1px]">
          <UploadedFileListHeader />
        </section>

        <section
          className={`w-full relative px-10 min-h-[300px] overflow-y-auto ${styles['list']}`}
          style={{
            maxHeight: `calc(100% - ${buttonSectionHeight} - 4rem)`,
          }}
        >
          {isLoading && (
            <div
              className="absolute z-50 top-0 left-0 backdrop-blur-md bg-gray-300 bg-opacity-50"
              style={{ width: '100%', height: '100%' }}
            >
              <SortFallback />
            </div>
          )}
          <>
            {files.map((file, idx) => {
              const standard = idx === 0;
              return (
                <div key={file.id}>
                  <FileCards file={file} standard={standard} />
                  {/* <span onClick={() => removeFile(file)}>x</span> */}
                </div>
              );
            })}
          </>
        </section>

        <section className="flex flex-col items-start w-full gap-3 bg-white border-t-[1px]">
          <div className="w-full px-10">
            <div className="flex gap-3 my-3">
              <input type="checkbox" id="check" />
              <label htmlFor="check">순서대로 PDF 일괄 병합</label>
            </div>
            <div className="flex gap-3 mt-2">
              <Button
                isLoading={isLoading}
                onClick={() => setTrigger(true)}
                className="text-black bg-white "
              >
                파일 추가
              </Button>
              <Button
                isLoading={isLoading}
                onClick={handleSortButton}
                className="text-white bg-blue-500"
              >
                자동분류
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

const buttonSectionHeight = '80px';
