"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { HiMail } from "react-icons/hi";
import { HiMiniLockClosed } from "react-icons/hi2";

const Signin = () => {
  const supabase = createClientComponentClient();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    if (!email || !password) {
      setErrorMsg("Both fields are required.");
      return;
    }

    if (email || password) {
      try {
        let { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
          options: {
            emailRedirectTo: `${location.origin}/auth/callback`,
          },
        });

        if (error) {
          setErrorMsg(error.message);
        }
        if (data) {
          router.refresh();
          router.push("/account");
        }
      } catch (error) {
        console.log("Error Msg:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      {errorMsg && (
        <p className='text-red-500 text-center text-sm'>{errorMsg}</p>
      )}
      <form noValidate className='group space-y-2'>
        <div className='relative'>
          <input
            type='email'
            name='email'
            id='email'
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            pattern='[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$'
            placeholder='Email '
            className='peer invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-xl py-2 pl-10 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm'
          />
          <HiMail className='absolute top-2.5 left-3 text-xl text-green-600' />
          <span className='hidden text-xs text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block'>
            Please enter a valid email address
          </span>
        </div>

        <div className='relative'>
          <input
            type='password'
            name='password'
            id='password'
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            pattern='.{6,}'
            placeholder='Password '
            className='peer invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-xl py-2 pl-10 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm'
          />
          <HiMiniLockClosed className='absolute top-3 left-3 text-lg text-green-600' />
          <span className='hidden text-xs text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block'>
            Password must be at least 6 chars long
          </span>
        </div>

        <div className='pt-2'>
          <button
            onClick={handleSignIn}
            className='w-full py-2.5 rounded-xl bg-purple-900 tracking-wide text-white group-invalid:pointer-events-none group-invalid:opacity-30'>
            {loading ? (
              <div className='flex items-center justify-center gap-x-4'>
                <AiOutlineLoading className='text-2xl font-medium animate-spin' />{" "}
                <span>Please wait</span>
              </div>
            ) : (
              "Sign in"
            )}
          </button>
        </div>
      </form>
    </>
  );
};

export default Signin;
