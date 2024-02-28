import LoadingSpinner from '@/components/loading-spinner/loading-spinner';

export default function SortFallback() {
  return (
    <div className="w-full h-full">
      <div className="mt-16 flex flex-col items-center justify-start gap-4 ">
        <LoadingSpinner />
        <div className="font-bold text-gray-800 text-xl">
          AI 자동 분류중입니다
        </div>
        <div className="font-bold text-gray-800 bg-gray-300 p-3 rounded-xl shadow-md">
          최대 1분 이상 소요될 수 있습니다
        </div>
      </div>
    </div>
  );
}
