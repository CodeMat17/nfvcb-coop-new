"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { AiOutlineLoading } from "react-icons/ai";

const OtherDataForm = ({ user_id }) => {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [id, setID] = useState(user_id);
  const [username, setUsername] = useState("");
  const [ippis_no, setIPPIS] = useState("");
  const [station, setStation] = useState("");
  const [phone_no, setPhoneNo] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);
  // const user = session?.user;

  async function updateProfile() {
    if (username === "") {
      setErrorMsg("Fullname is required");
      return;
    }
    if (phone_no === "") {
      setErrorMsg("Phone number is required");
      return;
    }
    if (username.length < 6) {
      setErrorMsg("Your fullname is cannot be less than 6 chars.");
      return;
    }
    if (station === "") {
      setErrorMsg("Station is required");
      return;
    }
    if (ippis_no === "") {
      setErrorMsg("IPPIS no. is required");
      return;
    }
    if (ippis_no.length < 9) {
      setErrorMsg("IPPIS no. cannot be less than 9 digits.");
      return;
    }
    if (username.length > 5 || station || ippis_no.length > 8 || phone_no) {
      try {
        setLoading(true);
        setErrorMsg(null);
        let { error: error1 } = await supabase
          .from("profiles")
          .update({
            username,
            ippis_no,
            station,
            phone_no
          })
          .eq("id", id);

        if (error1) {
          throw error1;
        }

        let { error: error2 } = await supabase
          .from("loans")
          .update({
            username,
          })
          .eq("id", id)
          .select();

        if (error2) {
          throw error2;
        }

        toast.success(`Registration completed successfully`, {
          duration: 5000,
          position: "top-center",
          // Styling
          style: {},
          className: "",
        });
        router.refresh();
        router.push("/coop-data");
      } catch (error) {
        console.log("Error updating the data!", error);
      } finally {
        setLoading(false);
      }
    }
  }

  return (
    <div className='bg-purple-300 rounded-xl p-4 flex flex-col justify-center space-y-2 w-full max-w-xs mx-auto'>
      <Toaster />
      <p className='text-xs text-red-500 text-center'>{errorMsg}</p>
      {/* <pre>{JSON.stringify(user.id, null, 2)}</pre> */}
      <input
        type='text'
        minLength={6}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder='Enter your fullname'
        className='px-3 py-2 rounded-xl'
      />
      <input
        type='text'
        value={phone_no}
        onChange={(e) => setPhoneNo(e.target.value)}
        placeholder='Enter your phone no.'
        className='px-3 py-2 rounded-xl'
      />
      <input
        type='text'
        value={station}
        onChange={(e) => setStation(e.target.value)}
        placeholder='Enter your station'
        className='px-3 py-2 rounded-xl'
      />
      <input
        type='text'
        value={ippis_no}
        maxLength={9}
        onChange={(e) => setIPPIS(e.target.value)}
        placeholder='Enter your IPPIS no.'
        className='px-3 py-2 rounded-xl'
      />
      <div className='pt-2'>
        <button
          onClick={updateProfile}
          className='bg-purple-900 tracking-wider transition-colors duration-500 hover:bg-purple-700 w-full py-3 rounded-xl text-white'>
          {loading ? (
            <div className='flex items-center justify-center gap-x-4'>
              <AiOutlineLoading className='text-2xl font-medium animate-spin' />{" "}
              <span>Completing...</span>
            </div>
          ) : (
            "Complete"
          )}
        </button>
      </div>
    </div>
  );
};

export default OtherDataForm;
