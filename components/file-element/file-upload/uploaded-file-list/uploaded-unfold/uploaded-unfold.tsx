'use client';

import { DragEvent, useEffect, useState } from 'react';
import { fileAtom, fileExploreTriggerAtom } from '@/atom/files';
import { useAtom, useSetAtom } from 'jotai';
import type { FileWithProgress } from '@/types/files';

import UploadedFileListHeader from './uploaded-file-list-header/uploaded-file-list-header';
import FileCards from '@/components/file-element/file-card/file-card';
import Button from '../buttons/buttons';
import SortFallback from './sort-fallback/sort-fallback';
import UploadUnfoldLayout from './upload-unfold-layout';

import '../uploaded-unfold/uploaded-unfold.css';
import styles from './uploded-unfold.module.css';

type Props = {
  dragFrom: null | number;
  dragTo: null | number;
  originalOrder: FileWithProgress[];
  updatedOrder: FileWithProgress[];
};

export default function UploadedUnfold() {
  const [files, setFiles] = useAtom(fileAtom);
  const setTrigger = useSetAtom(fileExploreTriggerAtom);
  const [isLoading, setIsLoading] = useState(false);

  const [dragAndDrop, setDragAndDrop] = useState<Props>({
    dragFrom: null,
    dragTo: null,
    originalOrder: [],
    updatedOrder: [],
  });

  const [dropTargetIndex, setDropTargetIndex] = useState<number | null>(null);
  console.log('dropTargetIndex', dropTargetIndex);
  const onDragStart = (e: DragEvent<HTMLLIElement>) => {
    // console.log('객체를 드래그하려고 시작할때 발생');
    e.currentTarget.style.opacity = '0.4';
    // 들어올린 파일의 original 인덱스
    const initialPosition = parseInt(e.currentTarget.dataset.position ?? '');
    // console.log('이동시키려는 객체의 원래 인덱스', initialPosition);
    setDragAndDrop((prev) => ({
      ...prev,
      dragFrom: initialPosition,
      originalOrder: files,
    }));
  };

  const onDragEnter = (e: DragEvent<HTMLLIElement>) => {
    // console.log('마우스가 대상 객체 위로 처음 진입할때 발생');
  };

  const onDragOver = (e: DragEvent<HTMLLIElement>) => {
    // console.log(' 드래그하면서 마우스가 대상 객체 위에 자리잡고있을때 발생');
    e.preventDefault();
    const overIndex = parseInt(e.currentTarget.dataset.position ?? '');
    if (dropTargetIndex !== overIndex) {
      setDropTargetIndex(overIndex);
    }
  };

  const onDrop = (e: DragEvent<HTMLLIElement>) => {
    e.preventDefault();

    let newList = dragAndDrop.originalOrder;
    const fromIndex = dragAndDrop.dragFrom;
    const toIndex = parseInt(e.currentTarget.dataset.position ?? '');
    setDropTargetIndex(null);
    // console.log(' 드래그가 끝나서 드래그하던 객체를 놓는 장소에 위치한 객체에서 발생함', toIndex);

    const itemDragged = newList[fromIndex as number];
    const remainingItems = newList.filter((_, idx) => idx !== fromIndex);

    newList = [...remainingItems.slice(0, toIndex), itemDragged, ...remainingItems.slice(toIndex)];
    setFiles(newList);

    if (toIndex !== dragAndDrop.dragTo) {
      setDragAndDrop({
        ...dragAndDrop,
        updatedOrder: newList,
        dragTo: toIndex,
      });
    }

    setDragAndDrop({
      dragFrom: null,
      dragTo: null,
      originalOrder: [],
      updatedOrder: [],
    });
  };

  const onDragLeave = (e: DragEvent<HTMLLIElement>) => {
    e.preventDefault();
    // console.log('드래그가 끝나서 마우스가 대상 객체의 위에서 벗어날때 발생함');
    setDropTargetIndex(null);

    setDragAndDrop({
      ...dragAndDrop,
      dragTo: 0,
    });
  };

  const onDragEnd = (e: DragEvent<HTMLLIElement>) => {
    e.currentTarget.style.opacity = '1';
  };

  const handleSortButton = () => {
    setIsLoading(true);

    new Promise((resolve) => {
      setTimeout(resolve, 4000);
    }).finally(() => setIsLoading(false));
  };

  if (!files) return null;
  if (!files.length) return null;

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
          <div className="absolute z-50 top-0 left-0 backdrop-blur-md bg-gray-300 bg-opacity-50 w-full h-screen">
            <SortFallback />
          </div>
        )}
        <>
          {files.map((file, idx) => {
            const standard = idx === 0;
            return (
              <li
                id="drag-with-image"
                key={file.id}
                className="list-none draggable"
                draggable={true}
                data-position={idx}
                onDragStart={onDragStart}
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
                onDragEnter={onDragEnter}
                onDragEnd={onDragEnd}
              >
                <FileCards file={file} standard={standard} isDropTarget={idx === dropTargetIndex} />
                {/* <span onClick={() => removeFile(file)}>x</span> */}
              </li>
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
