import { NavLink } from "react-router-dom";
import "../App.css";
import { useSelector } from "react-redux";

function Navbar() {
  const { token, user } = useSelector((state) => state.auth);
  return (
    <>
      <nav style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
        <NavLink
          to="/"
          end
          style={({ isActive }) => ({ fontWeight: isActive ? "700" : "400" })}
        >
          Home
        </NavLink>
        {token && (
          <NavLink
            to="/dashboard"
            style={({ isActive }) => ({ fontWeight: isActive ? "700" : "400" })}
          >
            Dashboard
          </NavLink>
        )}
        {token && user?.role === "admin" && (
          <NavLink
            to="/admin/dashboard"
            style={({ isActive }) => ({ fontWeight: isActive ? "700" : "400" })}
          >
            Admin Dashboard
          </NavLink>
        )}
        {!token && (
          <>
            <NavLink
              to="/signup"
              style={({ isActive }) => ({
                fontWeight: isActive ? "700" : "400",
              })}
            >
              Sign Up
            </NavLink>
            <NavLink
              to="/login"
              style={({ isActive }) => ({
                fontWeight: isActive ? "700" : "400",
              })}
            >
              Login
            </NavLink>
          </>
        )}
      </nav>
    </>
  );
}

export default Navbar;
