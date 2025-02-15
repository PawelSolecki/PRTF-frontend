import { useParams } from "react-router";

export default function PortfolioPage() {
  const params = useParams();
  return (
    <>
      <p>Portfolio {params.portfolioId}</p>
    </>
  );
}
