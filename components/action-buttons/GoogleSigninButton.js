"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { FcGoogle } from "react-icons/fc";

const GoogleSigninButton = () => {
  const supabase = createClientComponentClient();

  const signInWithGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
      },
    });
  };

  return (
    <div>
      <button
        onClick={signInWithGoogle}
        className='relative w-full text-cente py-2.5 rounded-xl bg-[#D76F30] text-white'>
        <span className='absolute top-2 left-4 sm:left-8 bg-white rounded-full p-0.5'>
          <FcGoogle className='text-2xl' />
        </span>
        <span className='text-sm'>Sign up with Google</span>
      </button>
    </div>
  );
};

export default GoogleSigninButton;
