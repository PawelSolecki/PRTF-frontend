import { useParams } from "react-router";
import PortfolioContent from "../components/portfolio/PortfolioContent";

export default function PortfolioPage() {
  const params = useParams();
  return (
    <>
      <PortfolioContent />
    </>
  );
}
