type Props = {
  progress?: number;
  isError?: boolean;
};
export default function ProgressBar({ progress, isError }: Props) {
  return (
    <div
      className={`w-[300px] h-2  rounded-full ${
        isError ? "bg-red-200" : "bg-blue-200"
      }`}
    >
      {!isError && (
        <div
          style={{ width: `${progress}%` }}
          className="h-full text-center text-xs text-white bg-blue-600 rounded-full transition-all duration-700 ease-in-out"
        />
      )}
    </div>
  );
}
