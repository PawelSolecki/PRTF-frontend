import Frame from "../UI/Frame";

export default function PortfolioSummary() {
  return (
    <section className="max-w-6xl mx-auto mt-8 px-6">
      <h2 className="text-4xl font-bold mb-4">Nazwa portfela</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Frame label="Wartość rynkowa" value="420 000 PLN" />
        <Frame label="Koszt" value="400 000 PLN" />
        <Frame label="Przychód" value="20 000 PLN" />
        {/* TODO: dodać strzałkę góra/dół */}
        <Frame label="Przychód (%)" value="4,76 %" />
      </div>
    </section>
  );
}
