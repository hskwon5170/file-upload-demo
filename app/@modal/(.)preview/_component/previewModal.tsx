"use client";

import BackButton from "@/components/backButton";
import { useEffect } from "react";
import styles from "./page.module.css";

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
  indexStatus: "SUCCESS";
  highlightCoordinate: HighlightCoordinate;
};

export default function PreviewModal({ data }: Root) {
  useEffect(() => {
    // 모달이 마운트될 때 body의 overflow를 hidden으로 설정
    document.body.style.overflow = "hidden";

    return () => {
      // 컴포넌트가 언마운트될 때 원래 상태로 복구
      document.body.style.overflow = "";
    };
  }, []);

  console.log("데이터입니다", data);

  const { originalName, displayUrl } = data;

  return (
    <div className="bg-black bg-opacity-80 fixed z-10 left-0 top-0 w-screen h-screen flex justify-center">
      <div className="relative top-10 ">
        <div className="flex w-full justify-between items-center mb-6">
          <BackButton />
          <div className="text-gray-200 text-lg">{originalName}</div>
          <div className="text-white">다운로드</div>
        </div>
        <div
          className={`${styles["image-zone"]} flex flex-col items-center max-h-[80vh] overflow-y-auto pr-6`}
        >
          <img className="w-[600px] h-[600px]" src={displayUrl} />
        </div>
      </div>
    </div>
  );
}
