import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import AccessDenied from "../pages/AccessDenied";
import SignupPage from "../pages/signUp/SignupPage";
import SigninPage from "../pages/signIn/SigninPage";
import ResetPasswordPage from "../pages/resetPassword/ResetPasswordPage";
import ForgotPasswordPage from "../pages/forgotePassword/ForgotPasswordPage";
import { useSelector } from "react-redux";
import ClientDashboard from "../pages/clientDashboard/ClientDashboard";
import ViewProfilePage from "../pages/profile/ViewProfilePage";

function Routing() {
  const { token } = useSelector((state) => state.auth);
  return (
    <>
      <Routes>
        {token && (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/client/:id" element={<ClientDashboard />} />
            <Route path="/profile" element={<ViewProfilePage />} />
          </>
        )}
        {!token && (
          <>
            <Route path="/signin" element={<SigninPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route
              path="/reset-password/:resetToken"
              element={<ResetPasswordPage />}
            />
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
