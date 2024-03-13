// type Props = {
//   progress?: number;
//   isError?: boolean;
// };
// export default function ProgressBar({ progress, isError }: Props) {
//   return (
//     <div
//       className={`w-[430px] h-4 p-1  rounded-full ${isError ? 'bg-red-200' : 'bg-[#f3e8ff]'} my-6 flex items-center`}
//     >
//       {!isError && (
//         <div
//           style={{ width: `${progress}%` }}
//           className="text-xs text-center text-white transition-all duration-500 h-2  ease bg-[#5347cf] rounded-full"
//         />
//       )}
//     </div>
//   );
// }

type Props = {
  progress?: number;
  isError?: boolean;
};
export default function ProgressBar({ progress, isError }: Props) {
  return (
    <div className={`w-[430px] h-2  rounded-full ${isError ? 'bg-red-200' : 'bg-[#f3e8ff]'} my-6`}>
      {!isError && (
        <div
          style={{
            width: `${progress}%`,
            transition: '1s ease-in-out',
          }}
          className="text-xs text-center text-white transition-all duration-500 h-2  ease bg-[#5347cf] rounded-full"
        />
      )}
    </div>
  );
}
