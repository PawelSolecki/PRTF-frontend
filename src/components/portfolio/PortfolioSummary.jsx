import Frame from "../UI/Frame";

export default function PortfolioSummary({ name, totalValue, isLoading }) {
  return (
    <section className="max-w-6xl mx-auto mt-8 px-6">
      <h2 className="text-4xl font-bold mb-4">
        {isLoading ? "Ładowanie..." : name}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Frame
          label="Wartość rynkowa"
          value={totalValue}
          isLoading={isLoading}
        />
        <Frame label="Koszt" value="... PLN" isLoading={isLoading} />
        <Frame label="Przychód" value="... PLN" isLoading={isLoading} />
        {/* TODO: dodać strzałkę góra/dół */}
        <Frame label="Przychód (%)" value="4,76 %" isLoading={isLoading} />
      </div>
    </section>
  );
}
