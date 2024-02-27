type Props = {
  element: string | React.ReactNode;
  className?: string;
  width?: number;
  height?: number;
  onClick?: () => void;
};
export default function HeaderButton({
  element,
  className,
  width = 32,
  height = 32,
  onClick = () => {},
}: Props) {
  return (
    <button
      className={`${className} flex justify-center items-center rounded-md`}
      style={{ width: `${width}px`, height: `${height}px` }}
      onClick={onClick}
    >
      {element}
    </button>
  );
}
