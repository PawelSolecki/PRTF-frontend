import PortfolioSummary from "./PortfolioSummary";
import PortfolioHoldings from "./PortfolioHoldings";
import PortfolioDetails from "./PortfolioDetails";
export default function PortfolioContent({
  portfolioSummary,
  portfolio,
  isLoading,
}) {
  return (
    <>
      <PortfolioSummary
        name={portfolio?.name}
        totalValue={portfolioSummary?.totalValue}
        totalCost={portfolioSummary?.totalCost}
        holdings={portfolio?.assets}
        isLoading={isLoading}
      />
      <PortfolioDetails
        allocations={portfolio?.allocations}
        isLoading={isLoading}
      />
      <PortfolioHoldings holdings={portfolio?.assets} />
    </>
  );
}
