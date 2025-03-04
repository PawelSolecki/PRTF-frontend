import { Link } from "react-router-dom";
export default function HoldingItem({ name, symbol, quantity, value, change }) {
  const isPositive = change.startsWith("+");

  return (
    <tr className="hover:bg-basic-100">
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-accent">
        {name}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-accent">
        <div className="inline-block bg-secondary rounded-[15px] px-3 p-1">
          {symbol}
        </div>
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-sm text-accent">
        {quantity}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-accent">
        {value}
      </td>
      <td
        className={`px-6 py-4 whitespace-nowrap text-sm ${
          isPositive ? "text-green-600" : "text-red-600"
        }`}
      >
        {change}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm space-x-4">
        <Link to="info" className="text-blue-600 hover:text-blue-800">
          Info
        </Link>
        <Link to="transaction">
          <span className="text-myGreen">Kup</span>/
          <span className="text-myRed">Sprzedaj</span>
        </Link>
      </td>
    </tr>
  );
}
