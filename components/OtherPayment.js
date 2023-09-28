const OtherPayment = () => {
  return (
    <div className='pt-8 max-w-sm mx-auto'>
      <h1 className='text-center font-medium text-lg'>
        You do not have a soft loan running now.
      </h1>
      <p className='mt-8 text-center'>Do you want to make other payments?</p>
      <div className="mt-2 px-8 flex items-center justify-around gap-x-6">
        <button className='w-full px-6 py-2.5 rounded-xl bg-gray-200 hover:bg-gray400'>
          No
        </button>
        <button className='w-full px-6 py-2.5 rounded-xl bg-[#D76F30] hover:bg-gray400 text-white'>
          Yes
        </button>
      </div>
    </div>
  );
};

export default OtherPayment;
