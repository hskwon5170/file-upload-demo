'use client';

import { useState } from 'react';
import { useDragAndDrop } from '@/hooks/useDragAndDrop';
import { fileAtom, fileExploreTriggerAtom } from '@/atom/files';
import { useAtom, useSetAtom } from 'jotai';
import UploadedFileListHeader from './uploaded-file-list-header/uploaded-file-list-header';
import FileCards from '@/components/file-element/file-card/file-card';
import Button from '../buttons/buttons';
import SortFallback from './sort-fallback/sort-fallback';
import UploadUnfoldLayout from './upload-unfold-layout';
import '../uploaded-unfold/uploaded-unfold.css';
import styles from './uploded-unfold.module.css';
import './uploaded-unfold.css';

export default function UploadedUnfold() {
  const openFileExplorer = useSetAtom(fileExploreTriggerAtom);

  const [files, setFiles] = useAtom(fileAtom);
  const [isLoading, setIsLoading] = useState(false);

  const { onDragStart, onDragOver, onDrop, onDragLeave, onDragEnd, dropTargetIndex } =
    useDragAndDrop();

  const handleSortButton = () => {
    setIsLoading(true);

    new Promise((resolve) => {
      setTimeout(resolve, 4000);
    }).finally(() => setIsLoading(false));
  };

  if (!files || !files.length) return null;

  return (
    <UploadUnfoldLayout>
      <section className="w-full bg-white border-b-[1px]">
        <UploadedFileListHeader />
      </section>

      <section
        className={`w-full relative px-4 min-h-[300px] overflow-y-auto overflow-x-hidden ${styles['list']}`}
        style={{
          maxHeight: `calc(100% - ${buttonSectionHeight} - 4rem)`,
        }}
      >
        {isLoading && (
          <div className="absolute z-50 top-0 left-0 backdrop-blur-md bg-gray-300 bg-opacity-50 w-full">
            <SortFallback />
          </div>
        )}
        <>
          {files.map((file, idx) => {
            const standard = idx === 0;
            return (
              <li
                key={file?.id}
                className="list-none draggable filecard"
                draggable={true}
                data-position={idx}
                onDragStart={onDragStart}
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
                onDragEnd={onDragEnd}
              >
                <FileCards
                  file={file}
                  standard={standard}
                  isDropTarget={idx === dropTargetIndex}
                  index={idx}
                />
              </li>
            );
          })}
        </>
      </section>

      <section className="flex h-full items-center justify-center w-full gap-3 bg-white border-t-[1px]">
        <div className="w-full px-10">
          {/* <div className="flex gap-3 my-3">
            <input type="checkbox" id="check" />
            <label htmlFor="check" className="cursor-pointer">
              순서대로 PDF 일괄 병합
            </label>
          </div> */}
          <div className="flex gap-3 mt-2">
            <Button
              isLoading={isLoading}
              onClick={() => openFileExplorer(true)}
              className="text-black bg-white "
            >
              파일 추가
            </Button>
            <Button className="text-white bg-[#5347cf]">PDF 일괄 병합</Button>
            <Button
              isLoading={isLoading}
              onClick={handleSortButton}
              className="text-white bg-[#5347cf]"
            >
              자동분류
            </Button>
          </div>
        </div>
      </section>
    </UploadUnfoldLayout>
  );
}

const buttonSectionHeight = '80px';
