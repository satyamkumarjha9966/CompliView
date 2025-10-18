import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div>
      <h2>Not Found - 404</h2>
      <p>Not Found Any Page</p>
      <button onClick={() => navigate("/")}>Home</button>
    </div>
  );
}
