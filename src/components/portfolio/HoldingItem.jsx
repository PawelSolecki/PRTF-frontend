import { Link } from "react-router-dom";
export default function HoldingItem({
  name,
  ticker,
  totalQuantity,
  pricePerUnit,
}) {
  const isPositive = true;

  return (
    <tr className="hover:bg-basic-100">
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-accent">
        {name}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-accent">
        <div className="inline-block bg-secondary rounded-[15px] px-3 p-1">
          {ticker}
        </div>
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-sm text-accent">
        {totalQuantity}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-accent">
        {pricePerUnit}
      </td>
      <td
        className={`px-6 py-4 whitespace-nowrap text-sm ${
          isPositive ? "text-green-600" : "text-red-600"
        }`}
      >
        0.0
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
