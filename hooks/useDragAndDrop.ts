import { useState } from 'react';
import type { FileWithProgress } from '@/types/files';
import { useAtom, useSetAtom } from 'jotai';
import { fileAtom, isOrderChangeAtom } from '@/atom/files';

type Props = {
  dragFrom: null | number;
  dragTo: null | number;
  originalOrder: FileWithProgress[];
  // updatedOrder: FileWithProgress[];
};

type DragLiElement = React.DragEvent<HTMLLIElement>;

export const useDragAndDrop = () => {
  const [files, setFiles] = useAtom(fileAtom);
  const setIsOrderChange = useSetAtom(isOrderChangeAtom);
  const [dropTargetIndex, setDropTargetIndex] = useState<number | null>(null);
  const [dragAndDrop, setDragAndDrop] = useState<Props>({
    dragFrom: null,
    dragTo: null,
    originalOrder: [],
  });

  const onDragStart = (e: DragLiElement) => {
    e.currentTarget.style.opacity = '0.5';

    // 들어올린 파일의 original 인덱스
    const fromIndex = parseInt(e.currentTarget.dataset.position ?? '');
    // console.log('이동시키려는 객체의 원래 인덱스', fromIndex);
    setDragAndDrop((prev) => ({
      ...prev,
      dragFrom: fromIndex,
      originalOrder: files,
    }));
  };

  const onDragOver = (e: DragLiElement) => {
    // console.log(' 드래그하면서 마우스가 대상 객체 위에 자리잡고있을때 발생');

    // 모달에 파일드랍 동작과 파일 순서 드래그 변경 구분을 위한 추가 상태
    setIsOrderChange(true);

    e.preventDefault();
    const overIndex = parseInt(e.currentTarget.dataset.position ?? '');
    if (dropTargetIndex !== overIndex) {
      setDropTargetIndex(overIndex);
    }
  };

  const onDrop = (e: DragLiElement) => {
    e.preventDefault();

    const { originalOrder, dragFrom, dragTo } = dragAndDrop;

    const originalOrderList = originalOrder;
    const fromIndex = dragFrom;
    const toIndex = parseInt(e.currentTarget.dataset.position ?? '');
    setDropTargetIndex(null);
    // console.log(' 드래그가 끝나서 드래그하던 객체를 놓는 장소에 위치한 객체에서 발생함', toIndex);

    // 모달에 파일드랍 동작과 파일 순서 드래그 변경 구분을 위한 추가 상태
    setIsOrderChange(false);

    const itemDragged = originalOrderList[fromIndex as number];
    const remainingItems = originalOrderList.filter((_, idx) => idx !== fromIndex);

    const updateOrderList = [
      ...remainingItems.slice(0, toIndex),
      itemDragged,
      ...remainingItems.slice(toIndex),
    ];
    setFiles(updateOrderList);
    if (toIndex !== dragTo) {
      setDragAndDrop((prev) => ({
        ...prev,
        // updatedOrder: updateOrderList,
        dragTo: toIndex,
      }));
    }

    setDragAndDrop({
      dragFrom: null,
      dragTo: null,
      originalOrder: [],
      // updatedOrder: [],
    });
  };

  const onDragLeave = (e: DragLiElement) => {
    e.preventDefault();
    // console.log('드래그가 끝나서 마우스가 대상 객체의 위에서 벗어날때 발생함');
    setDropTargetIndex(null);

    setDragAndDrop((prev) => ({
      ...prev,
      dragTo: 0,
    }));
  };

  const onDragEnd = (e: DragLiElement) => {
    e.currentTarget.style.opacity = '1';
    setIsOrderChange(false);
  };

  return { onDragStart, onDragOver, onDrop, onDragLeave, onDragEnd, dropTargetIndex };
};
