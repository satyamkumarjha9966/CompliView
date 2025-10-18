import "./App.css";
import Routing from "./components/routing";
import Navbar from "./components/navbar";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function App() {
  const { token, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const isUserLoggedIn = () => {
    if (!token) {
      navigate("/login");
    }
  };

  useEffect(() => {
    isUserLoggedIn();
  }, []);
  return (
    <>
      <Navbar />
      <Routing />
    </>
  );
}

export default App;
