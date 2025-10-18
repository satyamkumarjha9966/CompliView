import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

/**
 * ProtectedRoute wrapper for role-based route protection.
 * Usage:
 * <ProtectedRoute allowedRoles={["admin"]}><AdminPage /></ProtectedRoute>
 */
export default function ProtectedRoute({ children, allowedRoles = [] }) {
  const { token, user } = useSelector((state) => state.auth);

  // Not authenticated -> redirect to login
  if (!token) {
    return <Navigate to="/signin" replace />;
  }

  // If allowedRoles provided and user's role is not included -> redirect to home
  if (allowedRoles.length > 0) {
    const role = user?.role;
    if (!role || !allowedRoles.includes(role)) {
      return <Navigate to="/access-denied" replace />;
    }
  }

  // Authorized
  return children;
}
