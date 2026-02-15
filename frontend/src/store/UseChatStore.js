import { create } from "zustand";
import { toast } from "react-hot-toast";
import { axiosInstance } from "../lib/axios";

export const useChatStore = create((set, get) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,

    // =============================
    // GET ALL USERS (Sidebar)
    // =============================
    getUsers: async () => {
        set({ isUsersLoading: true });
        try {
            const res = await axiosInstance.get("/messages/users");
            set({ users: res.data });
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to load users");
        } finally {
            set({ isUsersLoading: false });
        }
    },

    // =============================
    // GET MESSAGES OF SELECTED USER
    // =============================
    getMessages: async (userId) => {
        set({ isMessagesLoading: true });
        try {
            const res = await axiosInstance.get(`/messages/${userId}`);
            set({ messages: res.data });
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to load messages");
        } finally {
            set({ isMessagesLoading: false });
        }
    },

    // =============================
    // SEND MESSAGE
    // =============================
    sendMessage: async (messageData) => {
        const { selectedUser, messages } = get();

        try {
            const res = await axiosInstance.post(
                `/messages/send/${selectedUser._id}`,
                messageData
            );

            set({ messages: [...messages, res.data] });
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to send message");
        }
    },

    // =============================
    // SET SELECTED USER
    // =============================
    setSelectedUser: (user) => {
        set({ selectedUser: user });
    },

    // =============================
    // REALTIME MESSAGE (Socket)
    // =============================
    addMessage: (newMessage) => {
        const { messages } = get();
        set({ messages: [...messages, newMessage] });
    },
}));
