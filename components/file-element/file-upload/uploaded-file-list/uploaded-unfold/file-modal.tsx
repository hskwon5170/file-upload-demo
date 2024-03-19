'use client';

import React, { useMemo, useState } from 'react';
import { fileAtom, fileExploreTriggerAtom, ocrFailStatusAtom } from '@/atom/files';
import { useAtomValue, useSetAtom } from 'jotai';
import UploadUnfoldLayout from './upload-unfold-layout';
import '../uploaded-unfold/uploaded-unfold.css';
import './uploaded-unfold.css';
import ModalHeader from './modal-element/modal-header';
import ModalFooter from './modal-element/modal-footer';
import ModalMain from './modal-element/modal-main';

export default function FileModal() {
  const openFileExplorer = useSetAtom(fileExploreTriggerAtom);
  const files = useAtomValue(fileAtom);
  const ocrFailedExists = useMemo(() => files.some((file) => file.isOcrFailed === true), [files]);
  console.log('files', files);
  const [isLoading, setIsLoading] = useState(false);
  const [sortProgress, setSortProgress] = useState({
    progress: 0,
    isSort: false,
  });

  // console.log('ocrFailedFiles', ocrFailedFiles);

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
      />
    </UploadUnfoldLayout>
  );
}
