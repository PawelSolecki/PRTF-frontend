import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function HoldingItem({
  name,
  ticker,
  totalQuantity,
  pricePerUnit,
  id,
  currency,
  type,
  broker,
  market,
  isExpanded,
  onToggleExpand,
}) {
  const isPositive = true;
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Fetch transactions only when the item is expanded
    if (isExpanded) {
      setIsLoading(true);
      fetch(`http://localhost:8090/api/v1/transaction/asset/${id}`, {
        credentials: "include",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch transactions");
          }
          return response.json();
        })
        .then((data) => {
          setTransactions(data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching transactions:", error);
          setIsLoading(false);
        });
    }
  }, [isExpanded, id]);

  return (
    <>
      <tr
        className={`hover:bg-basic-100 cursor-pointer ${
          isExpanded ? "bg-basic-100" : ""
        }`}
        onClick={onToggleExpand}
      >
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
          {pricePerUnit} {currency}
        </td>
        <td
          className={`px-6 py-4 whitespace-nowrap text-sm ${
            isPositive ? "text-green-600" : "text-red-600"
          }`}
        >
          0.0
        </td>
        <td
          className="px-6 py-4 whitespace-nowrap text-sm space-x-4"
          onClick={(e) => e.stopPropagation()}
        >
          <Link
            to={"transaction/" + id}
            className="text-blue-600 hover:text-blue-800"
          >
            <span className="text-myGreen">Kup</span>/
            <span className="text-myRed">Sprzedaj</span>
          </Link>
          <Link to={"delete/" + id} className="text-red-600 hover:text-red-800">
            Usuń
          </Link>
        </td>
      </tr>

      {isExpanded && (
        <tr className="bg-gray-50">
          <td colSpan="6" className="px-6 py-4">
            <div className="grid grid-cols-2 gap-8">
              {/* Asset Details */}
              <div>
                <h3 className="text-lg font-semibold mb-2">Szczegóły aktywa</h3>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Nazwa</p>
                      <p className="font-medium">{name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Ticker</p>
                      <p className="font-medium">{ticker}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Typ</p>
                      <p className="font-medium">{type}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Rynek</p>
                      <p className="font-medium">{market || "-"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Broker</p>
                      <p className="font-medium">{broker}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Waluta</p>
                      <p className="font-medium">{currency}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Ilość</p>
                      <p className="font-medium">{totalQuantity}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Cena jednostkowa</p>
                      <p className="font-medium">
                        {pricePerUnit} {currency}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <Link
                      to={"edit/" + id}
                      className="text-sm text-accent hover:text-accent-dark"
                    >
                      Edytuj szczegóły
                    </Link>
                  </div>
                </div>
              </div>

              {/* Transaction History */}
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  Historia transakcji
                </h3>
                {isLoading ? (
                  <div className="text-center py-4">Ładowanie...</div>
                ) : transactions.length > 0 ? (
                  <div className="bg-white p-4 rounded-lg shadow-sm max-h-[300px] overflow-y-auto">
                    {transactions.map((transaction, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center py-2 border-b last:border-0"
                      >
                        <div className="flex flex-col">
                          <span
                            className={
                              transaction.type === "BUY"
                                ? "text-myGreen font-medium"
                                : "text-myRed font-medium"
                            }
                          >
                            {transaction.type === "BUY" ? "Kupno" : "Sprzedaż"}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(transaction.date).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">
                            {transaction.quantity} szt.
                          </p>
                          <p className="text-sm">
                            {transaction.pricePerUnit} {currency}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-white p-4 rounded-lg shadow-sm text-center text-gray-500">
                    Brak transakcji
                  </div>
                )}
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}
