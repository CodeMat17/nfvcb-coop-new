"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { HiMail } from "react-icons/hi";
import { HiMiniLockClosed } from "react-icons/hi2";
import { ImEyeBlocked } from "react-icons/im";
import { FiEye, FiEyeOff } from "react-icons/fi";
import GoogleSigninButton from "../action-buttons/GoogleSigninButton";

const Signup = ({result}) => {
  const supabase = createClientComponentClient();
  const router = useRouter();

  const patternReg = "[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  // if (email.match(patternReg)) {
  //   console.log("valid");
  // } else {
  //   console.log("not valid");
  // }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordMatch(e.target.value === confirmPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setPasswordMatch(e.target.value === password);
  };

  const handleSignUp = async (e) => {
    e.preventDefault()
    setLoading(true);
    setErrorMsg(null);

    if (password !== confirmPassword) {
      setErrorMsg("Password and confirm password mismatch");
      return;
    }
    if (password === confirmPassword) {
      try {
        const { data, error } = await supabase.auth.signUp({
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
          result(true)
        }
      } catch (error) {
        console.log("Error Msg: ", error);
      } finally {
        setLoading(false);
      }
    }

 
  };


  return (
    <>
      {/* <GoogleSigninButton /> */}
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
            className='peer invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-full py-2 pl-10 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm'
          />
          <HiMail className='absolute top-2.5 left-3 text-xl text-green-600' />
          <span className='hidden text-xs text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block'>
            Please enter a valid email address
          </span>
        </div>

        <div className='relative w-full'>
          <input
            type={showPassword ? "text" : "password"}
            name='password'
            id='password'
            required
            value={password}
            onChange={handlePasswordChange}
            pattern='.{6,}'
            placeholder='Password '
            className='peer invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-full py-2 pl-10 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm'
          />
          <HiMiniLockClosed className='absolute top-3 left-3 text-lg text-green-600' />
          <span className='hidden text-xs text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block'>
            Password must be at least 6 chars long
          </span>
        </div>

        <div className='flex items-start gap-x-4'>
          <div className='relative w-full'>
            <input
              type={showPassword ? "text" : "password"}
              name='confirmpassword'
              id='confirmpassword'
              required
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              pattern='.{6,}'
              placeholder='Confirm Password '
              className='peer invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-full py-2 pl-10 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm'
            />
            {/* <ImEyeBlocked className='absolute top-3 left-3 text-lg text-green-600' /> */}
            <span className='hidden text-xs text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block'>
              Password must be at least 6 chars long
            </span>
            {!passwordMatch && (
              <p className='text-red-500 text-xs italic'>
                Passwords do not match.
              </p>
            )}
          </div>
          <div
            onClick={() => setShowPassword(!showPassword)}
            className=' transition-all duration-500 cursor-pointer mt-3 text-2xl text-[#D76F30]'>
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </div>
        </div>

        <div className='pt-2'>
          <button
            onClick={handleSignUp}
            // type='submit'
            className='w-full py-2.5 rounded-full bg-[#D76F30] tracking-wide text-white group-invalid:pointer-events-none group-invalid:opacity-30'>
            {loading ? (
              <div className='flex items-center justify-center gap-x-4'>
                <AiOutlineLoading className='text-2xl font-medium animate-spin' />{" "}
                <span className='whitespace-nowrap'>Please wait</span>
              </div>
            ) : (
              "Sign up"
            )}
          </button>
        </div>
      </form>
    </>
  );
};

export default Signup;
