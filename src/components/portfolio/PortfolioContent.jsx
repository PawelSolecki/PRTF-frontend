import PortfolioSummary from "./PortfolioSummary";
import PortfolioHoldings from "./PortfolioHoldings";
import PortfolioDetails from "./PortfolioDetails";
export default function PortfolioContent({ portfolio, isLoading }) {
  console.log("portfolio", portfolio);
  return (
    <>
      <PortfolioSummary
        name={portfolio?.name}
        totalValue={portfolio?.totalValue}
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
