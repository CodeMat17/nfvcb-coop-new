"use client";

import UpdateAvatar from "@/components/UpdateAvatar";
import { CldImage } from "next-cloudinary";
import { useState } from "react";

const AvatarComponent = ({ id, avatar }) => {
  const [avatarUrl, setAvatarUrl] = useState(null);

  return (
    <div className='relative'>
      {avatar ? (
        <div className='relative w-[96px] aspect-square rounded-full overflow-hidden'>
          <CldImage
            fill
            src={avatar}
            // sizes='50vw'
            alt='Profile image'
            loading='lazy'
          />
        </div>
      ) : (
        <div className='w-24 aspect-square bg-gray-500 rounded-full '></div>
      )}
      <div className='absolute -right-7 -bottom-2 shadow-2xl px-2 py-1 mt-8 rounded-full'>
        {id && <UpdateAvatar id={id} avatar={avatar} />}
      </div>
    </div>
  );
};

export default AvatarComponent;
