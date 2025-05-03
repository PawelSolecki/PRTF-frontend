import HoldingItem from "./HoldingItem";
//TODO: Lepsze ikonki
import AddIcon from "../../assets/AddIcon.png";
import { Link } from "react-router-dom";

const mockHoldings = [
  {
    id: 1,
    name: "Apple Inc",
    symbol: "AAPL",
    quantity: 4,
    value: "240,50 PLN",
    change: "+0,9%",
  },
  {
    id: 2,
    name: "Apple Inc",
    symbol: "AAPL",
    quantity: 4,
    value: "240,50 PLN",
    change: "+0,9%",
  },
];

export default function HoldingsList({ holdings }) {
  if (!holdings) {
    return (
      <div className="bg-white rounded-[15px] border-2 overflow-hidden">
        <p className="text-center text-gray-500 p-4">Brak aktywów w portfelu</p>
      </div>
    );
  }
  return (
    <div className="bg-white rounded-[15px] border-2 overflow-hidden">
      <table className="w-full">
        <thead className="border-b-2">
          <tr>
            {["Nazwa", "Symbol", "Ilość", "Wartość", "Zmiana", ""].map(
              (header) => (
                <th
                  key={header}
                  className="px-6 py-4 text-left text-[13px] font-medium text-dark uppercase tracking-wider"
                >
                  {header}
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {holdings.map((holding) => (
            <HoldingItem key={holding.id} {...holding} />
          ))}
        </tbody>
      </table>
      <div className="p-4 border-t border-gray-200 flex items-center gap-2">
        {/* TODO: podmieniac ikonke na hover (zmieniac kolor) */}
        <img src={AddIcon} />
        <Link
          to="add"
          className="text-accent underline font-medium hover:text-secondary-400 cursor-pointer"
        >
          Dodaj nowe aktywa
        </Link>
      </div>
    </div>
  );
}
