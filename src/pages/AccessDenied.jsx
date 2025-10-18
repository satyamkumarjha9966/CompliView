import React from "react";
import { useNavigate } from "react-router-dom";

export default function AccessDenied() {
  const navigate = useNavigate();
  return (
    <div style={{ padding: 24, textAlign: "center" }}>
      <h2>Access Denied</h2>
      <p>You don't have permission to view this page.</p>
      <button onClick={() => navigate("/")}>Home</button>
    </div>
  );
}
