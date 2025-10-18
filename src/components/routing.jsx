import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import NotFound from "../pages/NotFound";
import AccessDenied from "../pages/AccessDenied";
import AdminDashboard from "../pages/AdminDashboard";
import SignupPage from "../pages/signUp/SignupPage";
import SigninPage from "../pages/signIn/SigninPage";
import ResetPasswordPage from "../pages/resetPassword/ResetPasswordPage";
import ForgotPasswordPage from "../pages/forgotePassword/ForgotPasswordPage";
import { useSelector } from "react-redux";

function Routing() {
  const { token } = useSelector((state) => state.auth);
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        {!token && (
          <>
            <Route path="/signin" element={<SigninPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          </>
        )}
        {/* <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={["user", "admin"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        /> */}
        <Route path="/access-denied" element={<AccessDenied />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default Routing;
