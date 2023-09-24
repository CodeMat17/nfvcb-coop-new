"use client";

import { supabaseRole } from "@/app/utils/supabaseService";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const UpdateFinancialData = ({
  user_id,
  user_name,
  user_station,
  user_ippis,
  user_phone,
  user_monthly,
  user_total,
}) => {
  const router = useRouter();
  const [id, setID] = useState(user_id);
  const [username, setUsername] = useState(user_name);
  const [station, setStation] = useState(user_station);
  const [ippis_no, setIPPIS] = useState(user_ippis);
  const [phone_no, setPhoneNo] = useState(user_phone);
  const [joined_on, setJoined] = useState("");
  const [monthly_contribution, setMonthly] = useState(user_monthly);
  const [total_contributions, setTotal] = useState(user_total);
  const [loading, setLoading] = useState(false);

  const upload = async () => {
    try {
      setLoading(true);
      const { data: data1, error: error1 } = await supabaseRole
        .from("loans")
        .update({
          joined_on,
          monthly_contribution,
          total_contributions,
        })
        .eq("id", id);

      if (error1) {
        toast.error(error1.message, {
          duration: 5000,
          position: "top-center",
          // Styling
          style: {},
          className: "",
        });
      }

      if (!error1) {
        const { data: data2, error: error2 } = await supabaseRole
          .from("profiles")
          .update({
            confirmed: true,
          })
          .eq("id", id)
          .select();

        if (error2) {
          toast.error(error2.message, {
            duration: 5000,
            position: "top-center",
            // Styling
            style: {},
            className: "",
          });
        }

        if (data2) {
          toast.success(`Data uploaded successfully and member confirmed.`, {
            duration: 5000,
            position: "top-center",
            // Styling
            style: {},
            className: "",
          });
          router.refresh();
          router.back();
        }
      }
    } catch (error) {
      console.log("Error Msg: ", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='mt-6 space-y-4 max-w-sm mx-auto'>
      <Toaster />
      <div>
        <label className='text-sm text-gray-400'>Name</label>
        <input
          type='text'
          disabled
          defaultValue={username}
          className='w-full px-3 py-2 rounded-xl border text-gray-500'
        />
      </div>
      <div>
        <label className='text-sm text-gray-400'>Station</label>
        <input
          type='text'
          disabled
          defaultValue={station}
          className='w-full px-3 py-2 rounded-xl border text-gray-500'
        />
      </div>
      <div>
        <label className='text-sm text-gray-400'>IPPIS No</label>
        <input
          type='text'
          disabled
          defaultValue={ippis_no}
          className='w-full px-3 py-2 rounded-xl border text-gray-500'
        />
      </div>
      <div>
        <label className='text-sm text-gray-400'>Phone No</label>
        <input
          type='text'
          disabled
          defaultValue={phone_no}
          className='w-full px-3 py-2 rounded-xl border text-gray-500'
        />
      </div>
      <div>
        <label className='text-sm text-gray-400'>Date Joined No</label>
        <input
          type='date'
          value={joined_on}
          onChange={(e) => setJoined(e.target.value)}
          className='w-full px-3 py-2 rounded-xl border text-gray-500'
        />
      </div>

      <div>
        <label className='text-sm text-gray-400'>
          Current Monthly Contributions
        </label>
        <input
          type='number'
          value={monthly_contribution}
          onChange={(e) => setMonthly(e.target.value)}
          className='w-full px-3 py-2 rounded-xl border text-gray-500'
        />
      </div>
      <div>
        <label className='text-sm text-gray-400'>Total Contribution</label>
        <input
          type='number'
          value={total_contributions}
          onChange={(e) => setTotal(e.target.value)}
          className='w-full px-3 py-2 rounded-xl border text-gray-500'
        />
      </div>
      <div className=' pt-4'>
        <button
          onClick={upload}
          className='py-2 p-4 w-full bg-purple-200 text-purple-800 rounded-xl'>
          {loading ? "Uploading..." : "Upload and Confirm"}
        </button>
      </div>
    </div>
  );
};

export default UpdateFinancialData;
