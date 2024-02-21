type Props = {
  progress?: number;
  isError?: boolean;
};
export default function ProgressBar({ progress, isError }: Props) {
  return (
    <div className={`w-[430px] h-2  rounded-full ${isError ? 'bg-red-200' : 'bg-blue-200'} my-6`}>
      {!isError && (
        <div
          style={{ width: `${progress}%` }}
          className="h-full text-xs text-center text-white transition-all duration-700 ease-in-out bg-blue-600 rounded-full"
        />
      )}
    </div>
  );
}
