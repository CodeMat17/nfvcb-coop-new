"use client";

import { Dialog, Transition } from "@headlessui/react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { CldImage, CldUploadWidget } from "next-cloudinary";
import { useRouter } from "next/navigation";
import { Fragment, useState } from "react";
import toast from "react-hot-toast";
import { TbUserEdit } from "react-icons/tb";
import { AiOutlineLoading } from "react-icons/ai";

const UpdateAvatar = ({ id, avatar }) => {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [avatarUrl, setAvatarUrl] = useState(avatar);
  const [loading, setLoading] = useState(false);

  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const postAvatar = async () => {
    try {
      setLoading(true);

      const { error } = await supabase
        .from("profiles")
        .update({ avatar: avatarUrl })
        .eq("id", id)
        .select();

      if (error) {
        alert(error.message);
      }
      if (!error) {
        router.refresh();
        toast.success("Profile photo has been updated successfully.", {
          duration: 4000,
          position: "top-center",
        });
        closeModal();
      }
    } catch (e) {
      console.log("Error Msg: ", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div>
        <button
          type='button'
          onClick={openModal}
          className='shadow-2xl shadow-gray-500 bg-[#D76F30]/80 p-4 rounded-full'>
          <TbUserEdit className='text-xl text-white' />
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as='div' className='relative z-10' onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'>
            <div className='fixed inset-0 bg-black/25' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'>
                <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                  <Dialog.Title
                    as='h3'
                    className='text-lg text-center font-medium leading-6 text-gray-900'>
                    Update Your Profile Photo
                  </Dialog.Title>
                  <div className='my-4 flex justify-center'>
                    {avatarUrl ? (
                      <div className=''>
                        <CldImage
                          width='130'
                          height='130'
                          crop='thumb'
                          gravity='faces'
                          src={avatarUrl}
                          sizes='50vw'
                          alt='Profile image'
                          loading='lazy'
                          className='rounded-full'
                        />
                      </div>
                    ) : (
                      <div className='bg-gray-500 w-[130px] aspect-square rounded-full' />
                    )}
                  </div>

                  <div className='mt-6 flex items-start justify-between'>
                    <button
                      type='button'
                      className='bg-black/10 text-black py-2 px-4 rounded-xl text-sm font-medium'
                      onClick={closeModal}>
                      Close
                    </button>
                    <div className='flex items-center gap-2 '>
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
                                className='bg-[#D76F30]/10 text-[#D76F30] py-2 px-4 rounded-xl text-sm font-medium'>
                                Attach
                                {/* <TbCameraPlus className=' text-4xl text-[#55c694]' /> */}
                              </button>
                            );
                          }}
                        </CldUploadWidget>
                      </div>
                      <button
                        onClick={postAvatar}
                        className='flex items-center justify-center bg-green-600/10 text-green-600 py-2 px-4 rounded-xl text-sm font-medium'
                        disabled={loading}>
                        {loading ? (
                          <AiOutlineLoading className='text-2xl animate-spin' />
                        ) : (
                          "Upload"
                        )}
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default UpdateAvatar;
