import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuthStore } from "../store/UseAuthStore";
import { Eye, EyeOff, Loader } from "lucide-react";

function LoginPage() {
    const navigate = useNavigate();
    const { login, isLogging } = useAuthStore();

    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(formData, navigate);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm"
            >
                <h2 className="text-2xl font-bold mb-6 text-center">
                    Login to Your Account
                </h2>

                {/* Email */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Email
                    </label>
                    <input
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none"
                        type="email"
                        placeholder="Enter your email"
                        required
                    />
                </div>

                {/* Password */}
                <div className="mb-6 relative">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Password
                    </label>

                    <input
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none pr-10"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        required
                    />

                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-9 text-gray-500"
                    >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                </div>

                {/* Button */}
                <button
                    disabled={isLogging}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full flex justify-center items-center gap-2 disabled:opacity-70"
                    type="submit"
                >
                    {isLogging ? (
                        <>
                            <Loader className="size-4 animate-spin" />
                            Logging in...
                        </>
                    ) : (
                        "Login"
                    )}
                </button>

                <p className="text-sm text-center mt-4">
                    Don't have an account?{" "}
                    <Link className="text-blue-500 hover:underline" to="/signup">
                        Sign Up
                    </Link>
                </p>
            </form>
        </div>
    );
}

export default LoginPage;
