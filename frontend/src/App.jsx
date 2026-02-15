import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import SettingPage from "./pages/SettingPage";

import { useAuthStore } from "./store/UseAuthStore";

import { useEffect } from "react";
import { Loader } from "lucide-react";

const App = () => {
  const { authUser, checkAuth, isChecking } = useAuthStore();


  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log(authUser);

  if (isChecking && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );

  return (
    <div className="App">
      <Navbar />

      <div className="pt-20">
        <Routes>
          <Route path="/" element=<ProtectedRoute>{<HomePage />}</ProtectedRoute> />

          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/setting"
            element={
              <ProtectedRoute>
                <SettingPage />
              </ProtectedRoute>
            }
          />
        </Routes>

      </div>
    </div>
  );
};

export default App;
