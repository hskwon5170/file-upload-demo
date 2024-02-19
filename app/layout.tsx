import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";

const noto = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
  modal,
  filelist,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
  filelist: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={noto.className}>
        <div className="relative">
          {children}
          {modal}
          <div className="fixed top-0 right-0">{filelist}</div>
        </div>
      </body>
    </html>
  );
}
