import { useState } from "react";
import { useAuthStore } from "../store/UseAuthStore";
import { Loader } from "lucide-react";

function ProfilePage() {
  const { authUser, updateProfile, isUpdatingProfile } = useAuthStore();

  const [formData, setFormData] = useState({
    fullName: authUser?.fullName || "",
    email: authUser?.email || "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateProfile(formData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Profile Settings
        </h2>

        {/* User Info Display */}
        <div className="mb-6 text-center">
          <div className="w-20 h-20 rounded-full bg-blue-500 text-white flex items-center justify-center text-2xl font-bold mx-auto mb-3">
            {authUser?.fullName?.charAt(0).toUpperCase()}
          </div>
          <p className="text-gray-700 font-semibold">
            {authUser?.fullName}
          </p>
          <p className="text-gray-500 text-sm">
            {authUser?.email}
          </p>
        </div>

        {/* Update Form */}
        <form onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Full Name
            </label>
            <input
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none"
              type="text"
              required
            />
          </div>

          {/* Email */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none"
              type="email"
              required
            />
          </div>

          {/* Button */}
          <button
            disabled={isUpdatingProfile}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full flex justify-center items-center gap-2 disabled:opacity-70"
            type="submit"
          >
            {isUpdatingProfile ? (
              <>
                <Loader className="size-4 animate-spin" />
                Updating...
              </>
            ) : (
              "Update Profile"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProfilePage;
