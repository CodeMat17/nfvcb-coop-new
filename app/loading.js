import { AiOutlineLoading } from "react-icons/ai";

const LoadingUI = () => {
  return (
    <div className='min-h-screen px-4 py-24 flex flex-col items-center gap-y-4'>
      <div>
        <AiOutlineLoading className='text-3xl text-[#D76F30] animate-spin' />
      </div>
      <p className=' text-[#D76F30]'>Loading...</p>{" "}
    </div>
  );
};

export default LoadingUI;
