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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/v2/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Login successful:', data);
        // Handle successful login (e.g., redirect to dashboard)
      } else {
        const errorData = await response.json();
        console.error('Login failed:', errorData);
        // Handle login error (e.g., show error message)
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
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
        <form onSubmit={handleSubmit} className="flex flex-col items-start gap-4">
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
              required
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
              required
            />
          </div>

          <button
            type="submit"
            className="w-full h-[48px] border-2 font-jetbrainsmono text-xl text-black border-black font-light uppercase bg-[#4DDE2FB5] transition-all duration-300 mt-4"
          >
            SIGN UP
          </button>
        </form>
      </div>
    </div>
  );
}