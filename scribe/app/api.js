import axios from "axios";

const API_URL = "http://localhost:5000/api/v2/chatapp"; // Backend URL

// Get user chats
export const getUserChats = async (userId) => {
    try {
        const response = await axios.get(`${API_URL}/${userId}`, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Error fetching chats:", error);
        return [];
    }
};

// Get messages for a chat
export const getChatMessages = async (chatId) => {
    try {
        const response = await axios.get(`${API_URL}/${chatId}/messages`, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Error fetching messages:", error);
        return [];
    }
};

// Send a message
export const sendMessage = async (chatId, message) => {
    try {
        const response = await axios.post(`${API_URL}/send`, { chatId, message }, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Error sending message:", error);
        return null;
    }
};
