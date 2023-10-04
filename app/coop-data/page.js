import FormatedCurrency from "@/components/FormatedCurrency";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import dayjs from "dayjs";
import { Macondo } from "next/font/google";
import { cookies } from "next/headers";
import Link from "next/link";
import { IoMdContact } from "react-icons/io";

const macondo = Macondo({ subsets: ["latin"], weight: ["400"] });

export const revalidate = 0;

const DataPage = async () => {
  const supabase = createServerComponentClient({ cookies });

  const { data, error, status } = await supabase
    .from("profiles")
    .select(
      `loan_status, station, username, confirmed, loans(id, amount, joined_on, total_contributions, monthly_contribution, approved_on, as_at)`
    )
    .single();

  if (error && status !== 406) {
    throw error;
  }

  return (
    <div className='w-full px-4 py-12 min-h-screen'>
      <h1 className='text-2xl text-center font-medium tracking-wider text-[#D76F30]'>
        Hello,
      </h1>

      <div className='max-w-md mx-auto'>
        {data?.confirmed ? (
          <div>
            <div className='border mt-6 pt-2 pb-1 px-1 bg-green-600 rounded-xl shadow-md'>
              <p className='text-center text-white tracking-widest'>
                Cooperator
              </p>
              <div className='pr-2 py-2 flex items-center space-x-2 bg-purple-50 rounded-b-xl overflow-hidden mt-1'>
                <div className='max-w-[20%] '>
                  <IoMdContact size={70} className='text-[#D76F30]' />
                </div>

                <div className='max-w-[80%] '>
                  <section className={macondo.className}>
                    <h2 className=' text-xl font-medium block truncate text-[#D76F30]'>
                      {data?.username}
                    </h2>
                  </section>

                  <div className='text-gray-400 leading-4'>
                    <p>{data?.station}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className='mt-6'>
              <p className='text-sm'>
                Date joined:
                <span className='pl-1'>
                  {dayjs(data?.loans?.joined_on).format("MMM, DD, YYYY")}
                </span>
              </p>

              <div className='py-4'>
                <p className='text-lg font-medium'>Total Contributions</p>
                <div className='flex justify-start relative'>
                  <div className='p-1 shadow-md border rounded-full bg-green-100'>
                    <div className=' text-xl font-bold tracking-wide px-4 py-2 shadow-md rounded-full bg-[#f0dbcd] text-[#D76F30]'>
                      <FormatedCurrency
                        amount={data?.loans?.total_contributions}
                      />
                    </div>
                  </div>

                  <p className='absolute -bottom-6 left-3 text-sm text-gray-500'>
                    as at
                    <span className='pl-1'>
                      {dayjs(data?.loans?.as_at).format("MMM, YYYY")}
                    </span>
                  </p>
                </div>

                <div className='mt-10'>
                  <p>
                    Current monthly contribution:
                    <span className='font-bold'>
                      <FormatedCurrency
                        amount={data?.loans?.monthly_contribution}
                      />
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <div>
              <p className='text-lg font-medium'>
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
                <p>Soft loan eligibility: Yes - ₦50,000</p>
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
                  <p className='w-full text-center p-3 transition-colors duration-500 bg-[#D76F30] hover:bg-[#ab480b] rounded-xl text-white'>
                    APPLY FOR SOFT LOAN
                  </p>
                </Link>
              </div>
            )}
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
  );
};

export default DataPage;