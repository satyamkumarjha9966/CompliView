import "./App.css";
import Routing from "./components/routing";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MenuBar from "./components/menubar/MenuBar";
import { clearAuth } from "./store/slices/authSlice";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth);
  const isUserLoggedIn = () => {
    if (!token) {
      if (!window.location.pathname.startsWith("/reset-password")) {
        navigate("/signin");
      }
    }
  };

  const handleLogout = () => {
    dispatch(clearAuth());
    navigate("/signin");
  };

  const handleProfilePageNavigation = () => {
    navigate("/profile");
  };

  useEffect(() => {
    isUserLoggedIn();
  }, []);
  return (
    <>
      {token && (
        <MenuBar
          onLogout={handleLogout}
          onProfile={handleProfilePageNavigation}
        />
      )}
      <Routing />
    </>
  );
}

export default App;
