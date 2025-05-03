import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { useApi } from "../hooks/useApi";

export default function HomePage() {
  const { loggedIn, accessToken } = useAuth();

  const {
    data: portfolios,
    isLoading,
    isError,
    error,
    refetch,
  } = useApi({
    url: "http://localhost:8090/api/v1/portfolio/owner",
    method: "GET",
    enabled: !!accessToken,
    customMessages: {
      500: "Błąd serwera podczas pobierania portfolios",
      401: "Brak autoryzacji do pobrania portfolios",
      default: "Nie udało się pobrać portfolios",
    },
  });

  return (
    <div className="m-2 p-2">
      <p>Home page</p>
      <p>Jesteś {loggedIn ? "zalogowany" : "niezalogowany"}</p>
      <br></br>

      <Link className="border border-black" to="login">
        Login
      </Link>

      <div className="mt-4">
        <h2>Twoje portfolia:</h2>
        {isLoading && <p>Ładowanie portfolios...</p>}

        {isError && (
          <div>
            <p className="text-red-500">Błąd: {error.message}</p>
            <button
              onClick={() => refetch()}
              className="mt-2 px-3 py-1 bg-blue-500 text-white rounded"
            >
              Spróbuj ponownie
            </button>
          </div>
        )}

        {!isLoading && !isError && portfolios?.length === 0 && (
          <p>Nie masz jeszcze żadnych portfolios</p>
        )}

        {portfolios && portfolios.length > 0 && (
          <ul className="mt-2">
            {portfolios.map((portfolio) => (
              <li key={portfolio.id} className="mb-2">
                <Link
                  to={`/portfolio/${portfolio.id}`}
                  className="text-blue-600 hover:underline"
                >
                  {portfolio.name}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
