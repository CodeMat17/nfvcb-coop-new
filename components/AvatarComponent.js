"use client";

import UpdateAvatar from "@/components/UpdateAvatar";
import { CldImage } from "next-cloudinary";
import { useState } from "react";

const AvatarComponent = ({ id, avatar }) => {
  const [avatarUrl, setAvatarUrl] = useState(null);

  return (
    <div className='relative'>
      {avatar ? (
        <div className=''>
          <CldImage
            width='130'
            height='130'
            crop='thumb'
            gravity='faces'
            src={avatar}
            sizes='50vw'
            alt='Profile image'
            loading='lazy'
            className='rounded-full'
          />
        </div>
      ) : (
        <div className='w-[130px] aspect-square bg-gray-500 rounded-full '></div>
      )}
      <div className='absolute -right-10 -bottom-2 shadow-2xl px-2 py-1 mt-8 rounded-full'>
        {id && <UpdateAvatar id={id} avatar={avatar} />}
      </div>
    </div>
  );
};

export default AvatarComponent;
