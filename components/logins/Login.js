"use client";

import { Great_Vibes } from "next/font/google";
import Image from "next/image";
import { useState } from "react";
import Signin from "./Signin";
import Signup from "./Signup";

const vibes = Great_Vibes({ subsets: ["latin"], weight: ["400"] });

const LoginPage = () => {
  const [signUp, setSignUp] = useState(false);
  const [signupDone, setSignupDone] = useState(false);

  if (signupDone) {
    return (
      <div className='px-8 pt-32 min-h-screen flex flex-col items-center'>
        <div className='relative w-64 h-64 rouded-3xl overflow-hidden'>
          <Image alt='' fill priority src='/sent-msg.svg' />
        </div>
        <h1 className='text-center'>
          {" "}
          <span className='text-purple-800 font-medium'>Successful! </span>{" "}
          Check your email box to confirm your email.
        </h1>
      </div>
    );
  }

  return (
    <div className=''>
      <div className='flex flex-col justify-center items-center'>
        {/* <section className={vibes.className}>
          <p className='mt-6 text-center font-bold text-xl tracking-widest text-[#D76F30]'>
            {signUp ? "Sign Up" : "Sign In"}
          </p>
        </section> */}
      </div>

      <div className='w-full mt-2 pt-4 pb-16 rounded-2xl px-4 max-w-sm sm:max-w-xs mx-auto space-y-2 transition-all duration-500'>
        {signUp ? <Signup result={setSignupDone} /> : <Signin />}

        {/* <div className='flex justify-center text-green-400'>
          <p>OR</p>
        </div> */}

        {/* <GoogleSigninButton /> */}

        {signUp ? (
          <>
            <p className='text-center pt-6'>already a user?</p>

            <button
              onClick={() => setSignUp(!signUp)}
              className='w-full border border-[#D76F30] text-[#D76F30] px-4 py-2 rounded-full'>
              login
            </button>
          </>
        ) : (
          <>
            <p className='text-center pt-6'>a new user?</p>
            <button
              onClick={() => setSignUp(!signUp)}
              className='w-full border border-[#D76F30] text-[#D76F30] px-4 py-2 rounded-full'>
              Sign up
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
