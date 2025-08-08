import { useNavigate } from "react-router-dom";
import LoginForm from "../components/auth/LoginForm";
import { useAuth } from "../context/AuthContext";
import { useApi } from "../hooks/useApi";

export default function LoginPage() {
  const { setAccessToken } = useAuth();
  const navigate = useNavigate();

  const {
    mutateAsync: login,
    isPending: isLoginPending,
    error: loginError,
  } = useApi({
    url: "http://localhost:8090/api/v1/auth/login",
    method: "POST",
    requiresAuth: false,
    customMessages: {
      401: "Nieprawidłowy login lub hasło",
    },
  });

  const handleLogin = async ({ email, password }) => {
    try {
      const response = await login({ email, password });

      setAccessToken(response.access_token);
      navigate("/");
    } catch (error) {}
  };
  return (
    <>
      <LoginForm onSubmit={handleLogin} />
    </>
  );
}
