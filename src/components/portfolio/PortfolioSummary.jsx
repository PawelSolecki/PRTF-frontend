import Frame from "../UI/Frame";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

export default function PortfolioSummary({ name, totalValue, isLoading }) {
  return (
    <section className="max-w-6xl mx-auto mt-8 px-6">
      <div className="flex items-center space-x-4">
        <h2 className="text-4xl font-bold mb-4">
          {isLoading ? "Ładowanie..." : name}
        </h2>
        <Link
          className="mb-4 flex justify-center border-secondary border-2 rounded-[10px] shadow-sm relative p-1 "
          to="add-funds"
        >
          <Plus />
          Wpłać środki
        </Link>
      </div>

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
