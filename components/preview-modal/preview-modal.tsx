'use client';

import BackButton from '@/components/back-button/backButton';
import { useEffect, useState } from 'react';
import styles from './page.module.css';
import OcrButton from './ocr-button';
import DownloadButton from './download-button';
import ZoomButton from './zoom-button';
import Image from 'next/image';

type Root = {
  data: ImageData;
};

type HighlightCoordinate = {
  coordinateList: Array<{ x: number; y: number }>;
};

type ImageData = {
  id: number;
  url: null | string;
  originalName: string;
  extensionType: string;
  uuid: string;
  height: number;
  width: number;
  fileCollection: null;
  displayUrl: string;
  indexStatus: 'SUCCESS';
  highlightCoordinate: HighlightCoordinate;
};

export default function PreviewModal({ data }: Root) {
  useEffect(() => {
    // 모달이 마운트될 때 body의 overflow를 hidden으로 설정
    document.body.style.overflow = 'hidden';

    return () => {
      // 컴포넌트가 언마운트될 때 원래 상태로 복구
      document.body.style.overflow = '';
    };
  }, []);

  const { originalName, displayUrl } = data;

  const [zoom, setZoom] = useState(false);
  const onClickZoomIn = () => {
    setZoom(!zoom);
  };

  return (
    <>
      <div className="bg-black bg-opacity-80 fixed z-10 left-0 top-0 w-screen h-screen flex justify-center">
        <div className="relative w-screen h-screen">
          <div className="flex w-full h-[80px] justify-between items-center bg-black bg-opacity-30 px-3 backdrop-blur-xl">
            <BackButton />
            <div className="text-gray-200 text-lg max-w-[350px] truncate">
              {originalName}
            </div>
            <div className="flex gap-3 items-center">
              <OcrButton />
              <DownloadButton />
              <ZoomButton zoom={zoom} onClick={onClickZoomIn} />
            </div>
          </div>
          <div
            className={`${styles['image-zone']} flex flex-col items-center max-h-[80vh] overflow-y-auto pr-6 py-5`}
          >
            <Image
              alt=""
              src={displayUrl}
              width={600}
              height={600}
              priority
            />
          </div>
        </div>
      </div>
    </>
  );
}
