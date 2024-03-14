type Props = {
  className?: string;
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isLoading?: boolean;
};
export default function Button({
  className,
  children,
  onClick = () => {},
  isLoading = false,
}: Props) {
  return (
    <button
      disabled={isLoading}
      onClick={onClick}
      className={`${className} ${isLoading ? 'bg-gray-500 bg-opacity-30' : null} flex-1 h-10 rounded-xl p-3 flex items-center justify-center shadow-xl border`}
    >
      {children}
    </button>
  );
}
