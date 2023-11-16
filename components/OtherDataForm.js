"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { CldImage, CldUploadWidget } from "next-cloudinary";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { AiOutlineLoading } from "react-icons/ai";

const OtherDataForm = ({ user_id }) => {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [id, setID] = useState(user_id);
  const [avatarUrl, setAvatarUrl] = useState(null);
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
    if (ippis_no.length < 6) {
      setErrorMsg("IPPIS no. cannot be less than 6 digits.");
      return;
    }
    if (username.length > 5 || station || ippis_no.length > 5 || phone_no) {
      try {
        setLoading(true);
        setErrorMsg(null);
        let { error: error1 } = await supabase
          .from("profiles")
          .update({
            avatar: avatarUrl,
            username,
            ippis_no,
            station,
            phone_no,
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
          let { error: error2 } = await supabase
            .from("loans")
            .update({
              username,
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

          toast.success(`Registration completed successfully`, {
            duration: 5000,
            position: "top-center",
            // Styling
            style: {},
            className: "",
          });
          router.refresh();
          router.push("/coop-data");
        }
      } catch (error) {
        console.log("Error updating the data!", error);
      } finally {
        setLoading(false);
      }
    }
  }

  return (
    <div className='bg-green px-4 pb-4 rounded-xl flex flex-col justify-center space-y-3 w-full max-w-xs mx-auto'>
      <Toaster />
      <p className='text-xs text-red-500 text-center'>{errorMsg}</p>
      {/* <pre>{JSON.stringify(user.id, null, 2)}</pre> */}

      <div className='flex items-center justify-center gap-6'>
        {avatarUrl ? (
          <div className='relative w-[85px] aspect-square rounded-full overflow-hidden'>
            <CldImage
              fill
              src={avatarUrl}
              // sizes='50vw'
              alt='Profile image'
              loading='lazy'
            />
          </div>
        ) : (
          <div className='w-[85px] aspect-square rounded-full bg-gray-400'></div>
        )}
        <div className=''>
          <CldUploadWidget
            uploadPreset='nfvcbcoop'
            folder='nfvcbcoop_avatars'
            onSuccess={(result) => {
              // handle successful upload
              setAvatarUrl(result.info.public_id);
              // setPix(result.info.secure_url);
              // console.log(`result: `, result.info.secure_url);
            }}>
            {({ open }) => {
              function handleOnClick(e) {
                e.preventDefault();
                open();
              }
              return (
                <button
                  onClick={handleOnClick}
                  className='bg-green-600/10 text-green-600 font-medium text-sm py-2 px-4 rounded-xl'>
                  Attach
                  {/* <TbCameraPlus className=' text-4xl text-[#55c694]' /> */}
                </button>
              );
            }}
          </CldUploadWidget>
        </div>
      </div>

      <input
        type='text'
        minLength={6}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder='Enter your fullname'
        className='px-3 py-2 rounded-xl text-[#D76F30] bg-gray-100 border shadow-md'
      />
      <input
        type='text'
        value={phone_no}
        onChange={(e) => setPhoneNo(e.target.value)}
        placeholder='Enter your phone no.'
        className='px-3 py-2 rounded-xl text-[#D76F30] bg-gray-100 border shadow-md'
      />
      <input
        type='text'
        value={station}
        onChange={(e) => setStation(e.target.value)}
        placeholder='Enter your station'
        className='px-3 py-2 rounded-xl text-[#D76F30] bg-gray-100 border shadow-md'
      />
      <input
        type='text'
        value={ippis_no}
        maxLength={6}
        onChange={(e) => setIPPIS(e.target.value)}
        placeholder='Enter your IPPIS no.'
        className='px-3 py-2 rounded-xl text-[#D76F30] bg-gray-100 border shadow-md'
      />
      <div className='pt-2'>
        <button
          onClick={updateProfile}
          className='bg-[#D76F30] tracking-wider transition-colors duration-500 hover:bg-[#974714] w-full py-3 rounded-xl text-white'>
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
