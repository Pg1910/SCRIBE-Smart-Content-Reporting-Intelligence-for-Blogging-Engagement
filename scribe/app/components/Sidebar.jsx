'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

const Sidebar = () => {
    const router = useRouter();

    const handleDashboardClick = () => {
        router.push('/Dashboard');
    };

    return (
        <div className="absolute w-[250px] h-[1077px] top-[3px] left-[3px] border-2 border-[#000000]">
            <button
                className="absolute w-[214px] h-[34px] top-[92px] left-[20px] border-2 border-[#202020] p-[4px_12px] bg-[#47DFF0AD] text-black font-jetbrainsmono font-light text-[20px] leading-[26.4px] tracking-[0%] flex items-center gap-4"
                onClick={handleDashboardClick}
            >
                DASHBOARD
            </button>
            
            <div className="mt-[150px] px-4">
                <div className="mb-6">
                    <h3 className="font-inter text-black text-[16px] font-bold mb-2">Today</h3>
                    <div className="space-y-2">
                        <div className="text-[16px] text-black font-inter font-normal leading-[19.36px] cursor-pointer hover:bg-gray-100 p-2">Chat 1</div>
                        <div className="text-[16px] text-black font-inter font-normal leading-[19.36px] cursor-pointer hover:bg-gray-100 p-2">Chat 2</div>
                    </div>
                </div>
                
                <div className="mb-6">
                    <h3 className="font-inter text-black text-[16px] font-bold mb-2">Yesterday</h3>
                    <div className="space-y-2">
                        <div className="text-[16px] text-black font-inter font-normal leading-[19.36px] cursor-pointer hover:bg-gray-100 p-2">Chat 3</div>
                        <div className="text-[16px] text-black font-inter font-normal leading-[19.36px] cursor-pointer hover:bg-gray-100 p-2">Chat 4</div>
                    </div>
                </div>
                
                <div className="mb-6">
                    <h3 className="font-inter text-black text-[16px] font-bold mb-2">Previous 7 days</h3>
                    <div className="space-y-2">
                        <div className="text-[16px] text-black font-inter font-normal leading-[19.36px] cursor-pointer hover:bg-gray-100 p-2">Chat 5</div>
                        <div className="text-[16px] text-black font-inter font-normal leading-[19.36px] cursor-pointer hover:bg-gray-100 p-2">Chat 6</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;