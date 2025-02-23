'use client'
import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';

const Dashboard = () => {
  const [questionsAnswered, setQuestionsAnswered] = useState(0);

  const handleSubmit = () => {
    setQuestionsAnswered(questionsAnswered + 1);
  };

  return (
    <div className="flex bg-white">
      <Sidebar />
      <div className="w-[1667px] h-[1077px] top-2 border border-black p-4 gap-16 ml-[253px]">
        {/* Dashboard Header */}
        <div className="w-[1630px] h-[1023px] gap-7">
          {/* Share and Profile SVGs */}
          <div className="flex justify-end items-center gap-4">
            <div className="flex items-center bg-[#47DFF0AD] w-[50px] h-[50px] border-2 border-[#000000] p-[4px_12px] gap-4">
              {/* Info SVG */}
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v2h-2V7zm0 4h2v6h-2v-6z" fill="currentColor"/>
              </svg>
            </div>
            <div className="flex items-center bg-[#47DFF0AD] w-[112px] h-[34px] border-2 border-[#202020] p-[4px_12px] gap-4">
              {/* Share SVG */}
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7a2.5 2.5 0 000-1.4l7.13-4.11A2.5 2.5 0 0018 7.92c1.38 0 2.5-1.12 2.5-2.5S19.38 3 18 3s-2.5 1.12-2.5 2.5c0 .22.03.43.08.63L8.45 10.2a2.5 2.5 0 00-3.45-.2 2.5 2.5 0 000 3.6c.76.76 1.84 1.04 2.85.77l7.13 4.11c-.05.2-.08.41-.08.63 0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5-1.12-2.5-2.5-2.5z" fill="currentColor"/>
              </svg>
              <button className="w-[72px] h-[26px] text-black font-jetbrainsmono font-light text-[20px] leading-[26.4px] tracking-[0%]" onClick={handleSubmit}>
                SHARE
              </button>
            </div>
          </div>

          {/* Main Content Box */}
          <div className="w-[1630px] h-[990px] text-black gap-4 mt-4 border rounded-lg p-4">
                Dashboard
            {/* Large Box */}
            <div className="w-[536px] h-[322px] border rounded-lg p-4">
              {/* Inner Boxes */}
              <div className="grid grid-cols-3 gap-4">
                <div className="w-[160px] h-[140px] shadow-lg rounded-[20px] flex flex-col items-start justify-start p-2">
                  <span className="text-black font-inter font-medium text-[14px] leading-[16.94px] tracking-[-0.15px]">
                    Active Users
                  </span>
                  <span className="text-black font-inter font-bold text-[24px] leading-[29.05px] tracking-[0px] mt-[36.63px] ml-[7.32px]">
                    /80
                  </span>
                </div>
                <div className="w-[160px] h-[140px] shadow-lg rounded-[20px] flex flex-col items-start justify-start p-2">
                  <span className="text-black font-inter font-medium text-[14px] leading-[16.94px] tracking-[-0.15px]">
                    Questions Answered
                  </span>
                  <span className="text-black font-inter font-bold text-[24px] leading-[29.05px] tracking-[0px] mt-[36.63px] ml-[7.32px]">
                    {questionsAnswered}
                  </span>
                </div>
                <div className="w-[160px] h-[140px] shadow-lg rounded-[20px] flex flex-col items-start justify-start p-2">
                  <span className="text-black font-inter font-medium text-[14px] leading-[16.94px] tracking-[-0.15px]">
                    Avg Session Length
                  </span>
                  <span className="text-black font-inter font-bold text-[24px] leading-[29.05px] tracking-[0px] mt-[36.63px] ml-[7.32px]">
                    0m 0s
                  </span>
                </div>
                <div className="w-[160px] h-[140px] shadow-lg rounded-[20px] flex flex-col items-start justify-start p-2">
                  <span className="text-black font-inter font-medium text-[14px] leading-[16.94px] tracking-[-0.15px]">
                    Starting Knowledge
                  </span>
                  <span className="text-black font-inter font-bold text-[24px] leading-[29.05px] tracking-[0px] mt-[36.63px] ml-[7.32px]">
                    64%
                  </span>
                </div>
                <div className="w-[160px] h-[140px] shadow-lg rounded-[20px] flex flex-col items-start justify-start p-2">
                  <span className="text-black font-inter font-medium text-[14px] leading-[16.94px] tracking-[-0.15px]">
                    Current Knowledge
                  </span>
                  <span className="text-black font-inter font-bold text-[24px] leading-[29.05px] tracking-[0px] mt-[36.63px] ml-[7.32px]">
                    86%
                  </span>
                </div>
                <div className="w-[160px] h-[140px] shadow-lg rounded-[20px] flex flex-col items-start justify-start p-2">
                  <span className="text-black font-inter font-medium text-[14px] leading-[16.94px] tracking-[-0.15px]">
                    Knowledge Gain
                  </span>
                  <span className="text-black font-inter font-bold text-[24px] leading-[29.05px] tracking-[0px] mt-[36.63px] ml-[7.32px]">
                    +34%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;