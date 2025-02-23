const ProfileButton = () => {
    return (
        <div className="absolute top-[50px] left-[1850px] flex items-center bg-[#47DFF0AD] w-[50px] h-[50px] border-2 border-[#000000] p-[4px_12px] gap-4">
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                width="50" 
                height="50" 
                fill="none"
            >
                <path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20ZM11 7H13V13H11V7ZM11 15H13V17H11V15Z" fill="currentColor"/>
            </svg>
        </div>
    );
};

export default ProfileButton;