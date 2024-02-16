import BackButton from "@/components/backButton";
import FileInfo from "@/components/fileInfo";

export default function FileModal() {
  return (
    <div className="w-screen  flex justify-center items-center absolute z-10 top-0 right-0 left-0 bottom-0 bg-black bg-opacity-70">
      <div className="bg-white relative top-20 w-[600px] h-[400px] rounded-xl p-3">
        <div className="flex justify-end">
          <BackButton />
        </div>
        {/* <div>가로채기</div> */}
        {/* <div>모달</div> */}
        <FileInfo />
      </div>
    </div>
  );
}
