import LoadingSpinner from '@/components/loading-spinner/loading-spinner';

export default function SortFallback() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 w-full h-full">
      <LoadingSpinner />
      <div className="font-bold text-gray-800 text-xl">
        AI 자동 분류중입니다
      </div>
      <div className="font-bold text-gray-800 bg-gray-300 p-3 rounded-xl shadow-md">
        최대 1분 이상 소요될 수 있습니다
      </div>
    </div>
  );
}
