"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import {FcGoogle} from 'react-icons/fc'

const GoogleSigninButton = () => {
  const supabase = createClientComponentClient();

  const signInWithGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  };

  return (
    <div>
      <button
        onClick={signInWithGoogle}
        className='w-full py-1.5 flex items-center justify-center gap-x-3 rounded-xl bg-purple-900 text-white'>
        <span className="bg-white rounded-full p-1">
          <FcGoogle className='text-2xl' />
        </span>{" "}
        <span>Sign up with Google</span>
      </button>
    </div>
  );
};

export default GoogleSigninButton;
