"use client";
import BackButton from "@/components/backButton";
import { useEffect } from "react";
import styles from "./page.module.css";

export default function PreviewModal() {
  useEffect(() => {
    // 모달이 마운트될 때 body의 overflow를 hidden으로 설정
    document.body.style.overflow = "hidden";

    return () => {
      // 컴포넌트가 언마운트될 때 원래 상태로 복구
      document.body.style.overflow = "";
    };
  }, []);
  return (
    <div className="bg-black bg-opacity-80 fixed z-10 left-0 top-0 w-screen h-screen flex justify-center">
      <div className="relative top-10 ">
        <div className="flex w-full justify-between items-center mb-6">
          <BackButton />
          <div className="text-gray-200 text-xl">산업안전보건법</div>
          <div className="text-white">다운로드</div>
        </div>
        <div
          className={`${styles["image-zone"]} flex flex-col items-center max-h-[80vh] overflow-y-auto pr-6`}
        >
          <img
            className="w-[600px] h-[600px]"
            src="https://i.pinimg.com/originals/17/93/21/17932103b07ca950f547fb68e006793e.jpg"
          />
          <img
            className="w-[600px] h-[600px]"
            src="https://i.pinimg.com/originals/17/93/21/17932103b07ca950f547fb68e006793e.jpg"
          />
          <img
            className="w-[600px] h-[600px]"
            src="https://i.pinimg.com/originals/17/93/21/17932103b07ca950f547fb68e006793e.jpg"
          />
        </div>
      </div>
    </div>
  );
}
