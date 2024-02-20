"use client";

import BackButton from "@/components/back-button/backButton";
import { useEffect } from "react";
import styles from "./page.module.css";
import { LuDownload } from "react-icons/lu";

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

  const { originalName, displayUrl } = data;

  return (
    <>
      <div className="bg-black bg-opacity-80 fixed z-10 left-0 top-0 w-screen h-screen flex justify-center">
        <div className="relative top-10 ">
          <div className="flex w-full justify-between items-center mb-6">
            <BackButton />
            <div className="text-gray-200 text-lg max-w-[350px] truncate">
              {originalName}
            </div>
            <div className="bg-gray-200 w-8 h-8 rounded-md border-none shadow-md flex justify-center items-center">
              <LuDownload />
            </div>
          </div>
          <div
            className={`${styles["image-zone"]} flex flex-col items-center max-h-[80vh] overflow-y-auto pr-6`}
          >
            <img className="w-[600px] h-[600px]" src={displayUrl} />
          </div>
        </div>
      </div>
    </>
  );
}
