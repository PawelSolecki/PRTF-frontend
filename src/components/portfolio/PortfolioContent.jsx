import PortfolioSummary from "./PortfolioSummary";
import PortfolioHoldings from "./PortfolioHoldings";
import PortfolioDetails from "./PortfolioDetails";
export default function PortfolioContent({ portfolio, isLoading }) {
  return (
    <>
      <PortfolioSummary
        name={portfolio?.name}
        // totalValue={portfolio?.totalValue}
        totalValue={100}
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
