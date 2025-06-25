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

  const {
    data: portfolioSummary,
    isLoading: isSummaryLoading,
    refetch: refetchSummary,
  } = useApi({
    url: `http://localhost:8090/api/v1/portfolio/${portfolioId}/summary?currency=PLN`,
    customMessages: {
      500: "Błąd serwera podczas pobierania podsumowania portfolio",
      401: "Brak autoryzacji do pobrania podsumowania portfolio",
      default: "Nie udało się pobrać podsumowania portfolio",
    },
  });

  useEffect(() => {
    refetch();
    refetchSummary();
  }, [location.key]);

  return (
    <>
      <PortfolioContent
        portfolioSummary={portfolioSummary}
        portfolio={portfolio}
        isLoading={isLoading || isSummaryLoading}
        refetch={refetch}
      />

      <Outlet />
    </>
  );
}
