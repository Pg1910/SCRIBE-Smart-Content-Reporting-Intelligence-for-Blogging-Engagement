import React, { useRef, useEffect } from 'react';

const ChatInterface = ({ chatHistory, text, handleTextChange, handleSubmit }) => {
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chatHistory]);

    return (
        <div className="relative w-full h-full bg-white shadow-lg rounded-lg p-6 overflow-hidden">
            {/* Profile & Share Buttons */}
            <div className="absolute top-5 right-0 flex items-end p-4 gap-4 z-10">
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
                    <button className="w-[72px] h-[26px] text-black font-jetbrainsmono font-light text-[20px] leading-[26.4px] tracking-[0%]">
                        SHARE
                    </button>
                </div>
            </div>

            {/* Chat Area */}
            <div className="w-full h-full mt-4 overflow-y-auto pb-[150px]">
                {chatHistory.map((message, index) => (
                    <div key={index} className={`max-w-lg p-4 my-2 rounded-md shadow-md ${message.role === 'assistant' ? 'bg-gray-50' : 'bg-white self-end ml-auto'}`}>
                        <p className="text-gray-800 whitespace-pre-wrap">{message.content}</p>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="absolute w-[1562px] h-[110px] bottom-[10px] left-[34px] bg-white shadow-md rounded-lg p-4 flex items-center gap-4">
                <div className="relative flex-grow">
                    <textarea
                        className="w-full h-full p-3 border text-black font-inter border-black rounded-md resize-none focus:outline-none"
                        value={text}
                        onChange={handleTextChange}
                        placeholder="Type your message here..."
                        rows={3}
                    />
                    <button
                        className="absolute  font-jetbrainsmono bottom-[12px] right-[12px] w-[286px] h-[32px] bg-[#4DDE2FB5] text-black font-bold border-2 border-gray-800  p-[4px_12px]"
                        onClick={handleSubmit}
                    >
                        SUBMIT ↩
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatInterface;