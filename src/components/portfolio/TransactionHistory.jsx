import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";

export default function TransactionHistory({
  assetId,
  currency,
  isEditing,
  transactionsFormId,
  transactions = [], // Otrzymaj transakcje z rodzica
  isLoading = false, // Otrzymaj stan ładowania z rodzica
}) {
  const [markedForDeletion, setMarkedForDeletion] = useState({});
  const { accessToken } = useAuth();

  // Reset marked items when editing mode changes
  useEffect(() => {
    if (!isEditing) {
      setMarkedForDeletion({});
    }
  }, [isEditing]);

  const toggleTransactionMark = (transactionId, e) => {
    e.stopPropagation();
    setMarkedForDeletion((prev) => ({
      ...prev,
      [transactionId]: !prev[transactionId],
    }));
  };

  if (isLoading) {
    return <div className="text-center py-4">Ładowanie...</div>;
  }

  if (!transactions.length) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-sm text-center text-gray-500">
        Brak transakcji
      </div>
    );
  }

  // Przygotuj zaznaczone transakcje do usunięcia
  const transactionsToDelete = Object.entries(markedForDeletion)
    .filter(([_, isMarked]) => isMarked)
    .map(([id, _]) => id);

  return (
    <form id={transactionsFormId} className="transactions-form">
      {/* Ukryte pole z tokenem */}
      {accessToken && (
        <input type="hidden" name="accessToken" value={accessToken} />
      )}
      {/* Dodaj ukryte pola dla wszystkich zaznaczonych transakcji */}
      {transactionsToDelete.map((transactionId) => (
        <input
          key={transactionId}
          type="hidden"
          name="transactionIds[]"
          value={transactionId}
        />
      ))}

      <div className="bg-white p-4 rounded-lg shadow-sm max-h-[300px] overflow-y-auto">
        {transactions.map((transaction) => {
          const isMarked = markedForDeletion[transaction.id] || false;

          return (
            <div
              key={transaction.id || transaction.date}
              className={`flex justify-between items-center py-2 border-b last:border-0 ${
                isMarked ? "opacity-50 line-through" : ""
              }`}
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

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="font-medium">{transaction.quantity} szt.</p>
                  <p className="text-sm">
                    {transaction.pricePerUnit} {currency}
                  </p>
                </div>

                {isEditing && (
                  <button
                    type="button"
                    onClick={(e) => toggleTransactionMark(transaction.id, e)}
                    className={`${
                      isMarked ? "text-gray-400" : "text-red-500"
                    } hover:text-red-700 ml-3`}
                    title={
                      isMarked ? "Cofnij zaznaczenie" : "Zaznacz do usunięcia"
                    }
                  >
                    {isMarked ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 10h18M7 15h10"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    )}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Pokaz informacje o liczbie zaznaczonych transakcji */}
      {isEditing && transactionsToDelete.length > 0 && (
        <div className="text-sm text-gray-500 mt-2">
          Zaznaczono do usunięcia: {transactionsToDelete.length}
        </div>
      )}
    </form>
  );
}

// Action zmodyfikowany do obsługi wielu transakcji
export async function action({ request, params }) {
  const formData = await request.formData();
  const transactionIds = formData.getAll("transactionIds[]");

  // Pobierz token z formData
  const accessToken = formData.get("accessToken");

  console.log("Deleting transactions:", transactionIds);

  // Przygotuj nagłówki z tokenem
  const headers = {
    "Content-Type": "application/json",
  };

  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }

  const results = [];

  // Usuwanie transakcji sekwencyjnie
  for (const transactionId of transactionIds) {
    try {
      const response = await fetch(
        `http://localhost:8090/api/v1/transaction/${transactionId}`,
        {
          method: "DELETE",
          credentials: "include",
          headers,
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to delete transaction ${transactionId}`);
      }

      results.push({ id: transactionId, success: true });
    } catch (error) {
      results.push({ id: transactionId, success: false, error: error.message });
      console.error(`Error deleting transaction ${transactionId}:`, error);
    }
  }

  return { results };
}
