import { useState, useEffect } from "react";
import { useAuthStore } from "../store/UseAuthStore";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

function SettingPage() {
    const { authUser, logout } = useAuthStore();
    const navigate = useNavigate();

    const [darkMode, setDarkMode] = useState(false);

    // Apply dark mode to body
    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [darkMode]);

    const handleLogout = async () => {
        await logout(navigate);
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex justify-center items-center">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center dark:text-white">
                    Settings
                </h2>

                {/* Account Info */}
                <div className="mb-6">
                    <p className="text-gray-600 dark:text-gray-300">
                        Logged in as:
                    </p>
                    <p className="font-semibold dark:text-white">
                        {authUser?.email}
                    </p>
                </div>

                {/* Theme Toggle */}
                <div className="flex justify-between items-center mb-6">
                    <span className="dark:text-white">Dark Mode</span>
                    <button
                        onClick={() => setDarkMode(!darkMode)}
                        className={`w-12 h-6 flex items-center rounded-full p-1 transition ${darkMode ? "bg-blue-500" : "bg-gray-400"
                            }`}
                    >
                        <div
                            className={`bg-white w-4 h-4 rounded-full shadow-md transform transition ${darkMode ? "translate-x-6" : ""
                                }`}
                        ></div>
                    </button>
                </div>

                {/* Logout */}
                <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 text-white w-full py-2 rounded flex items-center justify-center gap-2"
                >
                    <LogOut size={18} />
                    Logout
                </button>
            </div>
        </div>
    );
}

export default SettingPage;
