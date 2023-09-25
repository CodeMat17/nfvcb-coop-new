"use client";

import OtherDataForm from "@/components/OtherDataForm";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";

const AccountPage = () => {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null);
  const [user_id, setUserID] = useState(null);
  const [email, setEmail] = useState(null);

  const getProfile = useCallback(async () => {
    try {
      setLoading(true);

      let { data, error, status } = await supabase
        .from("profiles")
        .select(`id, email, username`)
        // .eq("id", user?.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUserID(data.id);
        setUsername(data.username);
        setEmail(data.email);
      }
    } catch (error) {
      console.log("Error loading user data!", error.message);
    } finally {
      setLoading(false);
    }
  }, [supabase]);

  useEffect(() => {
    getProfile();
  }, [getProfile]);
  
  useEffect(() => {
    if (username !== null) {
      router.push("/coop-data");
    }
  }, [username]);

  if (loading) {
    return (
      <div className='min-h-screen flex flex-col items-center px-8 pt-32 space-y-4'>
        <div>
          <AiOutlineLoading className='text-3xl text-purple-700 font-bold animate-spin' />
        </div>
        <p className='text-purple-500'>Please wait</p>
      </div>
    );
  }

  return (
    <div className='px-4 py-12 min-h-screen w-full'>
      <div>
        <h1 className='text-xl text-center text-[#D76F30]'>Welcome, {email}</h1>
        <p className='text-center text-sm text-[#b0886f]'>
          Fill the form below to complete your registration.
        </p>
      </div>
      <div className='flex flex-col justify-center items-center'>
        <div className=' relative w-48 h-48'>
          <Image alt='' fill priority src='/account.svg' />
        </div>
      </div>
      {/* <p> name: {username.typeof}</p> */}
      <OtherDataForm user_id={user_id} />
    </div>
  );
};

export default AccountPage;
