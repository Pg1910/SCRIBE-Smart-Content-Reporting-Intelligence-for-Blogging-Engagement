'use client';

import React, { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="relative h-[1080px] w-[1920px] bg-white px-[776px] py-[294px] lg:p-8 md:p-5 sm:p-4">
      <div className="absolute top-[571px] left-[50%] transform -translate-x-1/2 w-[327px] px-4">
        <div className="flex items-center justify-center">
          <div className="border-t border-black flex-grow" />
          <div className="text-center text-[20px] text-black uppercase mx-4 font-jetbrainsmono font-light leading-[26.4px] tracking-normal">
            OR
          </div>
          <div className="border-t border-black flex-grow" />
        </div>
      </div>
      <div className="absolute top-[295px] left-[784px] h-[466px] w-[359px] rounded-[5px] border-2 border-solid border-black p-4">
        <div className="flex flex-col items-start gap-4">
          <div className="flex flex-col gap-1 w-full">
            <label className="text-[16px] font-semibold text-black">
              Email Address:
            </label>
            <input
              type="email"
              className="w-full h-[48px] px-4 py-2 border-2 border-black"
              placeholder="mail@mail.com"
              value={email}
              onChange={handleEmailChange}
            />
          </div>

          <div className="flex flex-col gap-1 w-full">
            <label className="text-[16px] font-semibold text-black">
              Password:
            </label>
            <input
              type="password"
              className="w-full h-[48px] px-4 py-2 border-2 border-black"
              placeholder="********"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>

          <button
            className="w-full h-[48px] border-2 font-jetbrainsmono text-xl text-black border-black font-light uppercase bg-[#4DDE2FB5] transition-all duration-300 mt-4"
          >
            SIGN UP
          </button>
        </div>
      </div>
    </div>
  );
}