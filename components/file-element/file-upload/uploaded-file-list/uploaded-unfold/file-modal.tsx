'use client';

import React, { useMemo, useState } from 'react';
import { fileAtom, fileExploreTriggerAtom, ocrFailStatusAtom } from '@/atom/files';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import UploadUnfoldLayout from './upload-unfold-layout';
import '../uploaded-unfold/uploaded-unfold.css';
import './uploaded-unfold.css';
import ModalHeader from './modal-element/modal-header';
import ModalFooter from './modal-element/modal-footer';
import ModalMain from './modal-element/modal-main';

export default function FileModal() {
  const openFileExplorer = useSetAtom(fileExploreTriggerAtom);
  const [files, setFiles] = useAtom(fileAtom);
  const ocrFailedExists = useMemo(() => files.some((file) => file.isOcrFailed === true), [files]);
  const [isLoading, setIsLoading] = useState(false);
  const [sortProgress, setSortProgress] = useState({
    progress: 0,
    isSort: false,
  });

  const handleSort = () => {
    setSortProgress((prev) => ({ ...prev, progress: 0, isSort: true }));
    setIsLoading(true);

    const interval = setInterval(() => {
      setSortProgress((prev) => ({ ...prev, progress: prev.progress + 25 }));
    }, 1000);

    new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
        clearInterval(interval);
      }, 4000);
    }).finally(() => {
      setIsLoading(false);
      setSortProgress({ progress: 100, isSort: false });
    });
  };

  const onClickConfirm = () => {
    setFiles((prev) =>
      prev.map((prev_file) => ({
        ...prev_file,
        isOcrFailed: false,
      })),
    );
  };

  if (!files || !files.length) return null;

  return (
    <UploadUnfoldLayout>
      <ModalHeader sortProgress={sortProgress} ocrFailedExists={ocrFailedExists} files={files} />
      <ModalMain isLoading={isLoading} files={files} ocrFailedExists={ocrFailedExists} />
      <ModalFooter
        isLoading={isLoading}
        openFileExplorer={openFileExplorer}
        handleSort={handleSort}
        ocrFailedExists={ocrFailedExists}
        ocrFailedConfirm={onClickConfirm}
      />
    </UploadUnfoldLayout>
  );
}
