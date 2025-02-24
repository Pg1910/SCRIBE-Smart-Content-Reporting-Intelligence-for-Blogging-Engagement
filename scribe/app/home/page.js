'use client';

import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import ChatInterface from './ChatInterface';
import React, { useState, useEffect } from 'react';
 import { getUserChats, getChatMessages, sendMessage } from '../api.js';

const Homepage = () => {
    const [text, setText] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const [chats, setChats] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    useEffect(() => {
        const fetchChats = async () => {
            const userId = "123"; // Replace with dynamic user ID
            const userChats = await getUserChats(userId);
            setChats(userChats);
        };
        fetchChats();
    }, []);
    const handleTextChange = (e) => {
        setText(e.target.value);
    };
    const handleChatSelect = async (chatId) => {
        setSelectedChat(chatId);
        const messages = await getChatMessages(chatId);
        setChatHistory(messages);
    };
    const handleSubmit = async () => {
        if (text.trim()) {
            const newMessage = { role: 'user', content: text };
            setChatHistory([...chatHistory, newMessage]);

            const response = await sendMessage(selectedChat, text);
            if (response) {
                setChatHistory([...chatHistory, newMessage, { role: 'assistant', content: response.reply }]);
            }
            setText('');
        }
    };

    return (
        <div className="relative h-[1080px] w-[1920px] bg-white flex">
            <Sidebar />
            
            {!submitted ? (
                <>
                    {/* Info and Share buttons */}
                    <div className="absolute top-[50px] left-[1850px] flex items-center bg-[#47DFF0AD] w-[50px] h-[50px] border-2 border-[#000000] p-[4px_12px] gap-4">
                        {/* Info SVG */}
                        <svg>...</svg>
                    </div>
                    <div className="absolute top-[58px] left-[1726px] flex items-center bg-[#47DFF0AD] w-[112px] h-[34px] border-2 border-[#202020] p-[4px_12px] gap-4">
                        {/* Share SVG */}
                        <svg>...</svg>
                        <button className="w-[72px] h-[26px] text-black font-jetbrainsmono font-light text-[20px] leading-[26.4px] tracking-[0%]">
                            SHARE
                        </button>
                    </div>

                    {/* Initial Input Area */}
                    <div className="absolute w-[584px] h-[390px] top-[345px] left-[668px] border-2 border-[#000000] p-4 text-black">
                        <p className="font-inter font-semibold text-[16px] leading-[19.36px]">
                            Hey! How may I be of service to you today?
                        </p>
                        <div className="relative w-[552px] h-[219px] border-2 border-black gap-4 mt-4">
                            <textarea
                                className="w-full h-full p-2 font-inter font-normal text-[16px] leading-[19.36px] text-black resize-none"
                                value={text}
                                onChange={handleTextChange}
                                placeholder="Type your message here..."
                            />
                            <div className="absolute w-[101px] h-[11px] bottom-[8px] left-[8px] text-black font-jetbrains-mono font-light text-[8px] leading-[10.56px]">
                                {text.length} / 1000 characters
                            </div>
                            <button
                                className="absolute w-[286px] h-[32px] bottom-[8px] right-[8px] bg-[#4DDE2FB5] border-2 border-[#202020] p-[4px_12px] text-black font-jetbrains-mono font-light text-[20px] leading-[26.4px]"
                                onClick={handleSubmit}
                            >
                                SUBMIT <span className="font-inter font-light text-[20px] leading-[24.2px]">↩</span>
                            </button>
                        </div>
                        <div className="flex gap-2 mt-3">
                            <div className="flex items-center bg-[#DF4545C2] w-[112px] h-[34px] border-2 border-black p-[4px_12px] gap-4">
                                {/* Search SVG */}
                                <svg>...</svg>
                                <button className="w-[72px] h-[26px] text-black font-jetbrainsmono font-light text-[20px] leading-[26.4px] tracking-[0%]">
                                    SEARCH
                                </button>
                            </div>
                            <div className="flex items-center bg-[#47DFF0AD] w-[112px] h-[34px] border-2 border-[#202020] p-[4px_12px] gap-4">
                                {/* Reason SVG */}
                                <svg>...</svg>
                                <button className="w-[72px] h-[26px] text-black font-jetbrainsmono font-light text-[20px] leading-[26.4px] tracking-[0%]">
                                    REASON
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <div className="absolute w-[1667px] h-[1077px] top-[3px] left-[253px] border-2 border-[#000000]">
                    <ChatInterface
                        chatHistory={chatHistory}
                        text={text}
                        handleTextChange={handleTextChange}
                        handleSubmit={handleSubmit}
                    />
                </div>
            )}
        </div>
    );
};

export default Homepage;
