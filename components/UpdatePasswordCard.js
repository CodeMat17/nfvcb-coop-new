"use client";

import { useState } from "react";

const UpdatePasswordCard = () => {
  const patternReg = "[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$";

  const [email, setEmail] = useState();

  return (
    <div>
      <div className=' '>
        <label>Email</label>
        <input
          type='text'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Enter your email'
          className='w-full mt-1 px-3 py-2.5 focus:outline-none bg-gray-100 rounded-xl'
        />
      </div>
    </div>
  );
};

export default UpdatePasswordCard;
