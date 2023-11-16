import FormatedCurrency from "@/components/FormatedCurrency";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import dayjs from "dayjs";
import { Autour_One } from "next/font/google";
import { cookies } from "next/headers";
import Link from "next/link";
import { MdLocationOn, MdOutlineCalendarMonth } from "react-icons/md";
import { Toaster } from "react-hot-toast";
import AvatarComponent from '@/components/AvatarComponent'

const autour = Autour_One({ subsets: ["latin"], weight: ["400"] });

export const revalidate = 0;

const DataPage = async () => {
  const supabase = createServerComponentClient({ cookies });

  const { data, error, status } = await supabase
    .from("profiles")
    .select(
      `id, avatar, loan_status, station, username, confirmed, loans(id, amount, joined_on, total_contributions, monthly_contribution, approved_on, as_at)`
    )
    .single();

  if (error && status !== 406) {
    throw error;
  }

  return (
    <>
      <Toaster />
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      <div className='w-full px-4 py-12 min-h-screen'>
        <div className='flex items-center justify-center gap-2 text-2xl text-center font-medium tracking-wider text-[#D76F30]'>
          <p>Hello</p> <p className='animate-waving-hand text-4xl'>👋🏻</p>
        </div>

        <div className='max-w-md mx-auto'>
          {data?.confirmed ? (
            <div>
              <div className=' mt-6 pt-2 pb-0.5 px-0.5 bg-gradient-to-tr from-green-600 via-green-600 to-[#D76F30] rounded-xl shadow-lg'>
                <div className='flex flex-col sm:flex-row items-center justify-center p-4 gap-2 sm:gap-4'>
                <AvatarComponent id={data?.id} avatar={data?.avatar} />
                  <p className='text-2xl sm:ml-3 font-medium text-center sm:text-left text-white tracking-wider'>
                    {data?.username}
                  </p>
                </div>

                <div className='flex gap-5 px-4 py-2 bg-green-50 rounded-xl overflow-hidden mt-1'>
                  <div className='flex items-center gap-1 text-gray-400'>
                    <MdLocationOn />
                    <p>{data?.station}</p>
                  </div>
                  <div className='flex items-center gap-1 text-gray-400'>
                    <MdOutlineCalendarMonth />
                    <p>
                      Joined{" "}
                      <span className=''>
                        {dayjs(data?.loans?.joined_on).format("MMM, DD, YYYY")}
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              <div className='px-4 py-8 flex flex-col sm:flex-row gap-5'>
                <div className='w-full sm:w-[50%] border border-gray-200 shadow-md p-4 rounded-xl bg-amber-50 text-center'>
                  <div className='text-3xl font-bold text-amber-500 tracking-widest'>
                    <FormatedCurrency
                      amount={data?.loans?.monthly_contribution}
                    />
                  </div>
                  <p>Current monthly contribution</p>
                </div>
                <div className='relative w-full sm:w-[50%] border border-gray-200 shadow-md p-4 rounded-xl bg-green-50 text-center'>
                  <div className='text-3xl font-bold text-green-600 tracking-widest'>
                    <FormatedCurrency
                      amount={data?.loans?.total_contributions}
                    />
                  </div>
                  <p>
                    Total Contributions as at{" "}
                    <span className=''>
                      {dayjs(data?.loans?.as_at).format("MMM, YYYY")}
                    </span>
                  </p>
                  <div className='absolute -top-2 -right-2'>
                    <span className='relative flex items-center justify-center h-5 w-5'>
                      <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75'></span>
                      <span className='relative inline-flex rounded-full h-3 w-3 bg-green-500'></span>
                    </span>
                  </div>
                </div>
              </div>

              {/* <div className='py-4'>
              <p className='text-lg font-medium'>
                Total Contributions as at{" "}
                <span className=''>
                  {dayjs(data?.loans?.as_at).format("MMM, YYYY")}
                </span>
              </p>
              <div className='flex justify-start relative'>
                <div className='p-1 shadow-md border rounded-full'>
                  <div className=' text-xl font-bold tracking-wide px-4 py-2 shadow-md rounded-full bg-[#D76F30]/20 text-[#D76F30]'>
                    <FormatedCurrency
                      amount={data?.loans?.total_contributions}
                    />
                  </div>
                </div>
              </div>

              <div className='mt-6'>
                <p>
                  Current monthly contribution:
                  <span className='font-bold'>
                    <FormatedCurrency
                      amount={data?.loans?.monthly_contribution}
                    />
                  </span>
                </p>
              </div>
            </div> */}

              <div className='mt-6 px-4 pt-4 bg-white rounded-xl shadow-md'>
                <div>
                  <p className='text-lg font-medium uppercase text-center'>
                    Loan Status:{" "}
                    {data?.loan_status === "active" && (
                      <span className='text-pink-600 font-medium'>ACTIVE</span>
                    )}
                    {data?.loan_status === "processing" && (
                      <span className='text-yellow-600 font-medium'>
                        PROCESSING
                      </span>
                    )}
                    {data?.loan_status === "inactive" && (
                      <span className=' font-medium'>INACTIVE</span>
                    )}
                  </p>
                  {data?.loan_status === "inactive" && (
                    <p className='text-center'>
                      You are eligibility for a soft-loan: ₦50,000 max.
                    </p>
                  )}
                </div>

                {data?.loan_status === "active" && (
                  <div className='my-8 bg-pink-200 p-4 rounded-xl'>
                    <p className='text-2xl text-pink-700 text-center'>
                      You are currently on loan
                    </p>
                    <p className='pt-4 text-center'>
                      Amount borrowed -{" "}
                      <span className='text-2xl'>{data?.loans?.amount}</span>
                    </p>
                    <p className='text-center'>
                      Approved on:{" "}
                      {dayjs(data?.loans?.approved_on).format("MMM DD, YYYY")}
                    </p>
                    <p className='text-center'>Loan lifespan: 3 months</p>
                  </div>
                )}

                {data?.loan_status === "processing" && (
                  <div className='my-8 py-4 bg-yellow-100 text-yellow-700 p-4 rounded-xl'>
                    <p className=' text-center'>
                      Your loan application of{" "}
                      <span className='text-2xl'>{data?.loans?.amount}</span> is
                      currently being processed. Kindly hold on.
                    </p>
                  </div>
                )}

                {data?.loan_status === "inactive" && (
                  <div className='py-8 w-full'>
                    <Link href='/soft-loan'>
                      <p className='w-full text-center p-3 transition-colors duration-500 bg-green-600 hover:bg-green-700 rounded-xl text-white'>
                        APPLY FOR SOFT LOAN
                      </p>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className='py-8'>
              <h1 className='text-center'>
                <span className='text-xl text-purple-900 font-medium '>
                  {data?.username}
                </span>
                , kindly wait for membership confirmation and data upload.
              </h1>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default DataPage;
