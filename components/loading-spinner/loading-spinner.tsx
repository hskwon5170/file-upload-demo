export default function LoadingSpinner() {
  return (
    <div
      className="animate-spin inline-block w-5 h-5 border-[3px] border-current border-t-transparent text-gray-400 rounded-full"
      role="status"
      aria-label="loading"
    />
  );
}
