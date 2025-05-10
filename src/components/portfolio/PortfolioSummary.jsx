import Frame from "../UI/Frame";

export default function PortfolioSummary({ name, totalValue, isLoading }) {
  return (
    <section className="max-w-6xl mx-auto mt-8 px-6">
      <h2 className="text-4xl font-bold mb-4">
        {isLoading ? "Ładowanie..." : name}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Frame label="Wartość rynkowa" isLoading={isLoading}>
          <span className="text-3xl font-semibold">{totalValue}</span>
        </Frame>
        <Frame label="Koszt" isLoading={isLoading}>
          <span className="text-3xl font-semibold">TBD</span>
        </Frame>
        <Frame label="Przychód" isLoading={isLoading}>
          <span className="text-3xl font-semibold">... PLN</span>
        </Frame>
        {/* TODO: dodać strzałkę góra/dół */}
        <Frame label="Przychód (%)" isLoading={isLoading}>
          <span className="text-3xl font-semibold">4.20%</span>
        </Frame>
      </div>
    </section>
  );
}
