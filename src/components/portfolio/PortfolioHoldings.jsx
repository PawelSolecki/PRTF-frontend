// components/Portfolio/PortfolioHoldings.jsx
import HoldingsList from "./HoldingsList";

export default function PortfolioHoldings({ holdings }) {
  return (
    <section className="max-w-6xl mx-auto mt-8 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Aktywa</h2>
      <HoldingsList holdings={holdings} />
    </section>
  );
}
