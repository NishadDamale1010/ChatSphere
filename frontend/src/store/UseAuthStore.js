import { create } from "zustand";
import toast from "react-hot-toast";
import axiosInstance from "../lib/axios";

export const useAuthStore = create((set) => ({
    authUser: null,
    isLogging: false,
    isSignup: false,
    isUpdatingProfile: false,
    isChecking: false,

    // ==========================
    // CHECK AUTH
    // ==========================
    checkAuth: async () => {
        set({ isChecking: true });
        try {
            const res = await axiosInstance.get("/auth/check");
            set({ authUser: res.data?.user || res.data });
        } catch (error) {
            console.error("Auth check failed:", error.message);
            set({ authUser: null });
        } finally {
            set({ isChecking: false });
        }
    },

    // ==========================
    // SIGNUP
    // ==========================
    signup: async (data, navigate) => {
        set({ isSignup: true });
        try {
            const res = await axiosInstance.post("/auth/signup", data);

            set({ authUser: res.data?.user || res.data });
            toast.success("Account created successfully 🚀");

            navigate("/");
        } catch (error) {
            toast.error(error.response?.data?.error || "Signup failed");
        } finally {
            set({ isSignup: false });
        }
    },

    // ==========================
    // LOGIN
    // ==========================
    login: async (data, navigate) => {
        set({ isLogging: true });
        try {
            const res = await axiosInstance.post("/auth/login", data);

            set({ authUser: res.data?.user || res.data });
            toast.success("Login successful 🎉");

            navigate("/");
        } catch (error) {
            toast.error(error.response?.data?.error || "Login failed");
        } finally {
            set({ isLogging: false });
        }
    },

    // ==========================
    // LOGOUT
    // ==========================
    logout: async (navigate) => {
        try {
            await axiosInstance.post("/auth/logout");
            set({ authUser: null });
            toast.success("Logged out successfully");

            if (navigate) navigate("/login");
        } catch (error) {
            toast.error("Logout failed");
        }
    },

    // ==========================
    // UPDATE PROFILE
    // ==========================
    updateProfile: async (data) => {
        set({ isUpdatingProfile: true });
        try {
            const res = await axiosInstance.put("/auth/update-profile", data);

            set({ authUser: res.data?.user || res.data });
            toast.success("Profile updated successfully ✨");
        } catch (error) {
            toast.error(error.response?.data?.error || "Update failed");
        } finally {
            set({ isUpdatingProfile: false });
        }
    },
}));
