type Props = {
  children: React.ReactNode;
  title: string;
  onClick?: () => void;
  btnTitle?: string;
  isOcrAction?: boolean;
};
export default function PreviewModalLayout({
  children,
  title,
  onClick = () => {},
  btnTitle,
  isOcrAction,
}: Props) {
  return (
    <>
      <div className="flex flex-col justify-center items-center h-full w-full bg-gray-100">
        <div>
          <div className="w-full py-3">{title}</div>
          <div>{children}</div>
          <div className="flex justify-center py-10">
            <button
              onClick={onClick}
              className="h-8 px-5  text-gray-300 bg-gray-600 focus:ring-4 focus:ring-gray-500 font-medium rounded-lg text-sm leading-tight uppercase transition duration-150 ease-in-out"
            >
              {btnTitle}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
