"use client";

import { Great_Vibes } from "next/font/google";
import Image from "next/image";
import { useState } from "react";
import LogoComponent from "../LogoComponent";
import GoogleSigninButton from "../action-buttons/GoogleSigninButton";
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
        {/* <LogoComponent classnames='w-20 h-20' /> */}
        {/* <h1 className='text-3xl text-center font-medium text-purple-800'>
          NFVCB COOP.
        </h1> */}
        <section className={vibes.className}>
          <p className='mt-6 text-center font-bold text-3xl tracking-widest text-[#D76F30]'>
            {signUp ? "Sign Up" : "Sign In"}
          </p>
        </section>
      </div>

      <div className='w-full mt-2 py-4 rounded-2xl bg-whit shadow-m borde px-4 max-w-sm sm:max-w-xs mx-auto space-y-2 transition-all duration-500'>
        <div className='flex justify-center pb-4'>
          <LogoComponent classnames='w-16 h-16' />
        </div>

        {signUp ? <Signup result={setSignupDone} /> : <Signin />}

        <div className='flex justify-center text-green-400'>
          <p>OR</p>
        </div>

        <GoogleSigninButton />

        {signUp ? (
          <p className='text-center text-sm pt-2'>
            already a user?{" "}
            <span
              onClick={() => setSignUp(!signUp)}
              className='text-green-600 font-medium tracking-wide cursor-pointer'>
              login
            </span>{" "}
          </p>
        ) : (
          <p className='text-center text-sm pt-2'>
            a new user?{" "}
            <span
              onClick={() => setSignUp(!signUp)}
              className='text-green-600 font-medium tracking-wide cursor-pointer'>
              signup
            </span>{" "}
          </p>
        )}
      </div>
      {/* <p>
        by signing up, you agree to our terms of services and privacy policy.
      </p> */}
    </div>
  );
};

export default LoginPage;
