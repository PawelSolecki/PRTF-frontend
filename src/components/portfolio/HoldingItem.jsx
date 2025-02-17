// components/Portfolio/HoldingItem.jsx
export default function HoldingItem({ name, symbol, quantity, value, change }) {
  const isPositive = change.startsWith("+");

  return (
    <tr className="hover:bg-basic-100">
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {name}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {symbol}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {quantity}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
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
        <button className="text-blue-600 hover:text-blue-800">Info</button>
        <button className="text-green-600 hover:text-green-800">Kup</button>
        <button className="text-red-600 hover:text-red-800">Sprzedaj</button>
        <button className="text-gray-600 hover:text-gray-800">Edytuj</button>
      </td>
    </tr>
  );
}
