type Props = {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
};
export default function Button({
  className,
  children,
  onClick = () => {},
}: Props) {
  return (
    <button
      onClick={onClick}
      className={`${className} flex-1 h-10 rounded-xl p-3 flex items-center justify-center shadow-lg border`}
    >
      {children}
    </button>
  );
}
