type Props = {
  progress?: number;
};
export default function ProgressBar({ progress }: Props) {
  return (
    // <section className="py-3">
    //   <div className="w-[300px] h-[5px] rounded-md bg-blue-600" />
    // </section>
    <div className="w-[300px] h-2 bg-blue-200 rounded-full">
      <div
        style={{ width: `${progress}%` }}
        className="h-full text-center text-xs text-white bg-blue-600 rounded-full transition-all duration-700 ease-in-out"
      ></div>
    </div>
  );
}
