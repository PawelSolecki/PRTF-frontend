import { createContext, useContext, useState, useEffect, useMemo } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);

  const loggedIn = useMemo(() => !!accessToken, [accessToken]);

  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        const res = await fetch("http://localhost:8090/api/v1/auth/refresh", {
          method: "POST",
          credentials: "include",
        });

        if (res.ok) {
          const data = await res.json();
          setAccessToken(data.access_token);
        } else {
          setAccessToken(null);
        }
      } catch (err) {
        console.error("Refresh token failed", err);
        setAccessToken(null);
      } finally {
        setLoading(false);
      }
    };

    fetchAccessToken();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        setAccessToken,
        loggedIn,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
