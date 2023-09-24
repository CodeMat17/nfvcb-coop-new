import { AiOutlineLoading } from "react-icons/ai";

const LoadingUI = () => {
  return (
    <div className='min-h-screen px-8 py-24 flex flex-col items-center space-y-4'>
      <div>
        <AiOutlineLoading className='text-3xl text-purple-700 animate-spin' />
      </div>
      <p className='text-xl text-purple-700'>Loading...</p>{" "}
    </div>
  );
};

export default LoadingUI;
