const ShareButton = () => {
    return (
        <div className="absolute top-[58px] left-[1726px] flex items-center bg-[#47DFF0AD] w-[112px] h-[34px] border-2 border-[#202020] p-[4px_12px] gap-4">
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                width="48" 
                height="48" 
                fill="none"
            >
                <path d="M18 8C19.6569 8 21 6.65685 21 5C21 3.34315 19.6569 2 18 2C16.3431 2 15 3.34315 15 5C15 6.65685 16.3431 8 18 8Z" stroke="#202020" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M6 15C7.65685 15 9 13.6569 9 12C9 10.3431 7.65685 9 6 9C4.34315 9 3 10.3431 3 12C3 13.6569 4.34315 15 6 15Z" stroke="#202020" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M18 22C19.6569 22 21 20.6569 21 19C21 17.3431 19.6569 16 18 16C16.3431 16 15 17.3431 15 19C15 20.6569 16.3431 22 18 22Z" stroke="#202020" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8.59 13.51L15.42 17.49" stroke="#202020" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M15.41 6.51L8.59 10.49" stroke="#202020" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <button className="w-[72px] h-[26px] text-black font-jetbrainsmono font-light text-[20px] leading-[26.4px] tracking-[0%]">
                SHARE
            </button>
        </div>
    );
};

export default ShareButton;