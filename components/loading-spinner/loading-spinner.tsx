type Props = {
  large?: boolean;
};

export default function LoadingSpinner({ large = false }: Props) {
  return (
    <div
      style={{ animationDuration: '.5s', width: large ? '2rem' : '1rem', height: large ? '2rem' : '1rem' }}
      className="animate-spin inline-block border-[1px] border-current border-t-transparent text-gray-400 rounded-full"
      role="status"
      aria-label="loading"
    />
  );
}
