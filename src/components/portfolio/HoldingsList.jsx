// components/Portfolio/HoldingsList.jsx
import HoldingItem from "./HoldingItem";

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

export default function HoldingsList() {
  return (
    <div className="bg-white rounded-[15px] border-2 overflow-hidden">
      <table className="w-full">
        <thead className="bg-basic-200">
          <tr>
            {["Nazwa", "Symbol", "Ilość", "Wartość", "Zmiana", ""].map(
              (header) => (
                <th
                  key={header}
                  className="px-6 py-4 text-left text-xs font-medium text-accent uppercase tracking-wider"
                >
                  {header}
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {mockHoldings.map((holding) => (
            <HoldingItem key={holding.id} {...holding} />
          ))}
        </tbody>
      </table>
      <div className="p-4 border-t border-gray-200">
        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
          + Dodaj nowe aktywo
        </button>
      </div>
    </div>
  );
}
