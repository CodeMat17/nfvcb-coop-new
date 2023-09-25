"use client";

import FormatedCurrency from "@/components/FormatedCurrency";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import dayjs from "dayjs";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { IoMdContact } from "react-icons/io";

export const revalidate = 0;

const DataPage = () => {
  const supabase = createClientComponentClient();
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null);
  const [station, setStation] = useState(null);
  const [loan_status, setStatus] = useState(null);
  const [confirmed, setConfirmed] = useState(false);
  const [loanAmount, setLoansAmount] = useState(null);
  const [joined_on, setJoined] = useState(null);
  const [monthly_contribution, setMonthly] = useState(null);
  const [total_contributions, setTotalContributions] = useState(null);

  const getProfile = useCallback(async () => {
    try {
      setLoading(true);
      let { data, error, status } = await supabase
        .from("profiles")
        .select(
          `loan_status, station, username, confirmed, loans(id, amount, joined_on, total_contributions, monthly_contribution)`
        )
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setStatus(data.loan_status);
        setUsername(data.username);
        setStation(data.station);
        setConfirmed(data.confirmed);
        setLoansAmount(data.loans.amount);
        setJoined(data.loans.joined_on);
        setMonthly(data.loans.monthly_contribution);
        setTotalContributions(data.loans.total_contributions);
      }
    } catch (error) {
      console.log("error loading data: ", error.message);
    } finally {
      setLoading(false);
    }
  }, [supabase]);

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  if (loading) {
    return (
      <div className='px-4 py-20 min-h-screen w-full flex flex-col items-center space-y-4'>
        <AiOutlineLoading className='text-3xl font-bold animate-spin text-[#D76F30]' />
        <p className=''>Please wait</p>
      </div>
    );
  }
  return (
    <div className='w-full px-4 py-12 min-h-screen'>
      <h1 className='text-2xl text-center font-medium tracking-wider text-[#D76F30]'>
        Hello,
      </h1>

      <div className='max-w-md mx-auto'>
        {confirmed ? (
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
                  <h2 className=' text-xl block truncate text-[#D76F30]'>
                    {username}
                  </h2>

                  <div className='text-gray-400 leading-4'>
                    <p>{station}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className='mt-6'>
              <p className='text-sm'>
                Date joined:
                <span className='pl-1'>
                  {dayjs(joined_on).format("MMM, DD, YYYY")}
                </span>
              </p>

              <div className='py-4'>
                <p className='text-lg font-medium'>Total Contributions</p>
                <div className='flex justify-start  '>
                  <div className='p-1 shadow-md border rounded-full bg-green-100'>
                    <div className='text-xl font-bold tracking-wide px-4 py-2 shadow-md rounded-full bg-[#f0dbcd] text-[#D76F30]'>
                      <FormatedCurrency amount={total_contributions} />
                    </div>
                  </div>
                </div>
                <div className='mt-6'>
                  <p>
                    Current monthly contribution:
                    <span className='font-bold'>
                      <FormatedCurrency amount={monthly_contribution} />
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <div>
              <p className='text-lg font-medium'>
                Loan Status:{" "}
                {loan_status === "active" && (
                  <span className='text-pink-600 font-medium'>ACTIVE</span>
                )}
                {loan_status === "processing" && (
                  <span className='text-yellow-600 font-medium'>
                    PROCESSING
                  </span>
                )}
                {loan_status === "inactive" && (
                  <span className=' font-medium'>INACTIVE</span>
                )}
              </p>
              {loan_status === "inactive" && (
                <p>Soft loan eligibility: Yes - ₦50,000</p>
              )}
            </div>

            {loan_status === "active" && (
              <div className='my-8 bg-pink-200 p-4 rounded-xl'>
                <p className='text-2xl text-pink-700 text-center'>
                  You are currently on loan
                </p>
                <p className='pt-4 text-center'>
                  Amount borrowed -{" "}
                  <span className='text-2xl'>{loanAmount}</span>
                </p>
                <p className='text-center'>Approved on: Sept 01, 2023</p>
                <p className='text-center'>Loan lifespan: 3 months</p>
              </div>
            )}
            {loan_status === "processing" && (
              <div className='my-8 py-4 bg-yellow-100 text-yellow-700 p-4 rounded-xl'>
                <p className=' text-center'>
                  Your loan application of{" "}
                  <span className='text-2xl'>{loanAmount}</span> is currently
                  being processed. Kindly hold on.
                </p>
              </div>
            )}
            {loan_status === "inactive" && (
              <div className='py-8 w-full'>
                <Link href='/soft-loan'>
                  <p className='w-full text-center p-3 transition-colors duration-500 bg-purple-900 hover:bg-purple-700 rounded-xl text-white'>
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
                {username}
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
