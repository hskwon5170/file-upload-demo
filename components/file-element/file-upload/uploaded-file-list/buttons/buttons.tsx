type Props = {
  className?: string;
  children: React.ReactNode;
};
export default function Button({ className, children }: Props) {
  return (
    <button
      className={`${className} flex-1 h-10 rounded-xl p-3 flex items-center justify-center shadow-lg border`}
    >
      {children}
    </button>
  );
}
