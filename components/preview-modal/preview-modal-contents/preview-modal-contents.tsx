'use client';
import { useState } from 'react';
import PdfPreview from '../pdf-preview/pdf-preview';

export default function PreviewModalContents() {
  const [selectedPage, setSelectedPage] = useState(1);
  return (
    <div className="flex px-3">
      <section className="w-[250px] flex flex-col items-center">
        <PdfPreview
          file="/files/file.pdf"
          size={60}
          isPreview
          selectedPage={selectedPage}
          setSelectedPage={setSelectedPage}
        />
      </section>
      <section className="flex-1">
        <PdfPreview
          file="/files/file.pdf"
          size={500}
          selectedPage={selectedPage}
          setSelectedPage={setSelectedPage}
        />
      </section>
    </div>
  );
}
