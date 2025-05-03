import PortfolioSummary from "./PortfolioSummary";
import PortfolioHoldings from "./PortfolioHoldings";

export default function PortfolioContent({ portfolio, isLoading }) {
  return (
    <>
      <PortfolioSummary
        name={portfolio?.name}
        totalValue={portfolio?.totalValue}
        isLoading={isLoading}
      />
      <PortfolioHoldings holdings={portfolio?.assets} />
    </>
  );
}
