import { NavLink } from "react-router-dom";
import "../App.css";
import { useSelector } from "react-redux";

function Navbar() {
  const { token, user } = useSelector((state) => state.auth);
  return (
    <>
      <nav
        style={{
          display: "flex",
          gap: "1rem",
          padding: "1rem",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "var(--surface)",
          borderBottom: "2px solid var(--subtle)",
        }}
      >
        <NavLink
          to="/"
          end
          style={({ isActive }) => ({
            fontWeight: isActive ? "700" : "400",
            color: "var(--text)",
            fontSize: "2.2rem",
            fontWeight: "bold",
            borderBottom: "1px solid var(--accent)",
          })}
        >
          Compile View
        </NavLink>
        {/* {token && (
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
        )} */}
      </nav>
    </>
  );
}

export default Navbar;
