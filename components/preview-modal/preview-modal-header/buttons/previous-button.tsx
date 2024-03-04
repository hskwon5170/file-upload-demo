type Props = {
  onClick: () => void;
};
export default function PreviousButton({ onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="h-8 px-5 bg-transparent text-gray-300 hover:bg-gray-600 focus:ring-4 focus:ring-gray-500 font-medium rounded-lg text-sm leading-tight uppercase transition duration-150 ease-in-out"
    >
      이전으로
    </button>
  );
}
