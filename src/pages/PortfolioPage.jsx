import { Outlet, useParams } from "react-router";
import PortfolioContent from "../components/portfolio/PortfolioContent";
import { useApi } from "../hooks/useApi";

export default function PortfolioPage() {
  const { portfolioId } = useParams();
  const { data: portfolio, isLoading } = useApi({
    url: `http://localhost:8090/api/v1/portfolio/${portfolioId}`,

    customMessages: {
      500: "Błąd serwera podczas pobierania portfolio",
      401: "Brak autoryzacji do pobrania portfolio",
      default: "Nie udało się pobrać portfolio",
    },
  });
  console.log("portfolio", portfolio);
  console.log("isLoading", isLoading);
  return (
    <>
      <PortfolioContent portfolio={portfolio} isLoading={isLoading} />

      <Outlet />
    </>
  );
}
