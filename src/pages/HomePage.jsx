import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
export default function HomePage() {
  const { loggedIn } = useAuth();
  return (
    <>
      <p>Home page</p>
      <p>Jesteś {loggedIn ? "zalogowany" : "niezalogowany"}</p>
      <Link>moje portfele</Link>

      <Link to="login">Login</Link>
    </>
  );
}
