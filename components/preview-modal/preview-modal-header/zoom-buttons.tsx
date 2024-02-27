import { FiPlusCircle } from 'react-icons/fi';
import { FiMinusCircle } from 'react-icons/fi';

export default function ZoomButtons() {
  return (
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 font-bold  rounded-md bg-transparent text-gray-300 shadow-md flex justify-center items-center hover:bg-gray-500 cursor-pointer transition-all duration-300 ease-in-out">
        <FiPlusCircle />
      </div>

      <div className="w-8 h-8 font-bold rounded-md bg-transparent text-gray-300 shadow-md flex justify-center items-center hover:bg-gray-500 cursor-pointer transition-all duration-300 ease-in-out">
        <FiMinusCircle />
      </div>
    </div>
  );
}
