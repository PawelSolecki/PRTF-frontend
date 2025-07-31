import { Link } from "react-router-dom";
import Frame from "../components/UI/Frame";
import { useAuth } from "../context/AuthContext";
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
  console.log(portfolios);

  return (
    <div className="flex justify-center items-center min-h-screen">
      {!loggedIn ? (
        <div className="text-center">
          <p className="text-3xl mb-6">Zaloguj</p>
          <p className="text-xl mb-6">
            Aby w pełni móc korzystać z aplikacji, musisz się zalogować.
          </p>
          <Link
            className="m-5 justify-center border-secondary border-2 rounded-[10px] shadow-sm relative p-3 px-6 text-lg"
            to="login"
          >
            Login
          </Link>
        </div>
      ) : (
        <div className="w-full max-w-4xl mx-auto p-4">
          <div className="text-center mb-8">
            <p className="text-3xl">Witaj!</p>
            <p className="text-xl mb-6">Twoje portfolia:</p>
          </div>
          <div className="mt-4">
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {portfolios.map((portfolio) => (
                  <Link
                    key={portfolio.id}
                    to={`/portfolio/${portfolio.id}`}
                    className="block hover:scale-105 transition-transform duration-200"
                  >
                    <Frame label={portfolio.name} isLoading={isLoading}>
                      <div className="pr-8">
                        <div className="mb-3">
                          <p className="text-sm text-gray-600 mb-1">
                            Wartość całkowita:
                          </p>
                          <div className="text-lg font-semibold">
                            {portfolio.totalValue &&
                              Object.entries(portfolio.totalValue).map(
                                ([currency, value], index) => (
                                  <span
                                    key={currency}
                                    className={index > 0 ? "ml-4" : ""}
                                  >
                                    {currency === "USD"
                                      ? "$"
                                      : currency === "EUR"
                                      ? "€"
                                      : ""}
                                    {Number(value).toFixed(2)}
                                    {currency !== "USD" && currency !== "EUR"
                                      ? ` ${currency}`
                                      : ""}
                                  </span>
                                )
                              )}
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 mb-1">
                            Ostatnia aktualizacja:
                          </p>
                          <p className="text-sm">
                            {new Date(portfolio.updatedAt).toLocaleDateString(
                              "pl-PL",
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}
                          </p>
                        </div>
                      </div>
                    </Frame>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
