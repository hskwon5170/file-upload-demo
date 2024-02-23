import type { Metadata } from 'next';
import { Noto_Sans_KR } from 'next/font/google';
import './globals.css';

const noto = Noto_Sans_KR({
  subsets: ['latin'],
  weight: [
    '100',
    '200',
    '300',
    '400',
    '500',
    '600',
    '700',
    '800',
    '900',
  ],
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
  modal,
  filelist,
  previewimage,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
  filelist: React.ReactNode;
  previewimage: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={noto.className + ' flex flex-col'}>
        <div className="flex">
          <div className="w-[200px] bg-gray-200 p-4 fixed h-full top-0 left-0 flex justify-center items-center flex-col">
            Left Sidebar
          </div>

          <div className="fixed top-0 left-[200px] right-[200px] flex flex-col h-screen">
            <div className="p-4 text-white bg-gray-500 z-10">
              Header
            </div>
            <div className="overflow-y-auto flex-1">{children}</div>
          </div>

          <div className="w-[200px] bg-gray-200 p-4 fixed h-full top-0 right-0 flex justify-center items-center flex-col">
            Right Sidebar
          </div>
        </div>

        {modal}
        <div className="fixed right-4 bottom-4">{filelist}</div>
        <div className="fixed top-0 right-2">{previewimage}</div>
      </body>
    </html>
  );
}
