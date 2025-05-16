import { Outlet, useParams } from "react-router";
import PortfolioContent from "../components/portfolio/PortfolioContent";
import { useApi } from "../hooks/useApi";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function PortfolioPage() {
  const { portfolioId } = useParams();
  const location = useLocation();
  const {
    data: portfolio,
    isLoading,
    refetch,
  } = useApi({
    url: `http://localhost:8090/api/v1/portfolio/${portfolioId}`,

    customMessages: {
      500: "Błąd serwera podczas pobierania portfolio",
      401: "Brak autoryzacji do pobrania portfolio",
      default: "Nie udało się pobrać portfolio",
    },
  });

  useEffect(() => {
    refetch();
  }, [location.key]);

  return (
    <>
      <PortfolioContent portfolio={portfolio} isLoading={isLoading} />

      <Outlet />
    </>
  );
}
