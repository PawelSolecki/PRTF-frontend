import {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";

const AuthContext = createContext();
const REFRESH_INTERVAL = 10 * 60 * 1000; // 10 minut w milisekundach

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);

  const loggedIn = useMemo(() => !!accessToken, [accessToken]);

  const fetchAccessToken = useCallback(async () => {
    try {
      const res = await fetch("http://localhost:8090/api/v1/auth/refresh", {
        method: "POST",
        credentials: "include",
      });

      if (res.ok) {
        const data = await res.json();
        setAccessToken(data.access_token);
        return true;
      } else {
        setAccessToken(null);
        return false;
      }
    } catch (err) {
      console.error("Refresh token failed", err);
      setAccessToken(null);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  // Początkowe pobranie tokenu
  useEffect(() => {
    fetchAccessToken();
  }, [fetchAccessToken]);

  // Timer odświeżający token
  useEffect(() => {
    // Uruchamiamy timer tylko jeśli jesteśmy zalogowani
    if (!accessToken) return;

    const refreshTimer = setInterval(() => {
      fetchAccessToken();
    }, REFRESH_INTERVAL);

    // Czyszczenie timera przy odmontowaniu komponentu lub zmianie accessToken
    return () => clearInterval(refreshTimer);
  }, [accessToken, fetchAccessToken]);

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        setAccessToken,
        loggedIn,
        loading,
        refreshToken: fetchAccessToken, // Eksportujemy funkcję do ręcznego odświeżania
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
