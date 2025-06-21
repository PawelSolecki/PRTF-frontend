import { useState, useEffect } from "react";
import { Link, useFetcher } from "react-router-dom";
import AssetDetails from "./AssetDetails";
import TransactionHistory from "./TransactionHistory";

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
  const [isEditing, setIsEditing] = useState(false);
  const assetFetcher = useFetcher();
  const transactionFetcher = useFetcher();
  const deleteFetcher = useFetcher();

  // useEffect pozostaje bez zmian
  useEffect(() => {
    if (
      isExpanded &&
      (!transactionFetcher.data || transactionFetcher.state === "idle")
    ) {
      // Używamy funkcji pomocniczej aby uniknąć dodania transactionFetcher do zależności
      const loadTransactions = () => {
        transactionFetcher.load(`/api/transactions/asset/${id}`);
      };
      loadTransactions();
    }
  }, [isExpanded, id]);

  // Asset data including fetched transactions is passed from parent
  const asset = {
    name,
    ticker,
    totalQuantity,
    pricePerUnit,
    id,
    currency,
    type,
    broker,
    market,
  };

  const handleEditClick = (e) => {
    e.stopPropagation();
    setIsEditing(true);
  };

  const handleCancelEdit = (e) => {
    e?.stopPropagation();
    setIsEditing(false);
  };

  const handleSubmitAssetForm = (e) => {
    e.preventDefault();
    e.stopPropagation();

    // 1. Zapisz zmiany w szczegółach aktywa
    const assetForm = document.getElementById(`asset-form-${id}`);
    const assetFormData = new FormData(assetForm);

    assetFetcher.submit(assetFormData, {
      method: "patch",
      action: `/api/assets/${id}`,
    });

    // 2. Pobierz i prześlij dane formularza transakcji
    const transactionsForm = document.getElementById(`transactions-form-${id}`);
    const transactionIds = new FormData(transactionsForm).getAll(
      "transactionIds[]"
    );

    // Wyślij tylko jeśli są jakieś transakcje do usunięcia
    if (transactionIds.length > 0) {
      deleteFetcher.submit(new FormData(transactionsForm), {
        method: "DELETE",
        action: `/api/transactions`,
      });

      // Odśwież listę transakcji po usunięciu
      setTimeout(() => {
        transactionFetcher.load(`/api/transactions/asset/${id}`);
      }, 300);
    }

    // 3. Wyjdź z trybu edycji
    setIsEditing(false);
  };

  // Pobierz liczbę zaznaczonych transakcji dla widoku
  const getMarkedTransactionsCount = () => {
    if (!isEditing) return 0;

    try {
      const form = document.getElementById(`transactions-form-${id}`);
      if (!form) return 0;

      const formData = new FormData(form);
      return formData.getAll("transactionIds[]").length;
    } catch (e) {
      console.error("Error reading marked transactions:", e);
      return 0;
    }
  };

  return (
    <>
      {/* Pierwszy wiersz tabeli - bez zmian */}
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
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold">Szczegóły aktywa</h3>
                </div>
                <AssetDetails
                  asset={asset}
                  isEditing={isEditing}
                  formId={`asset-form-${id}`}
                />
              </div>

              {/* Transaction History */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold">Historia transakcji</h3>
                </div>
                <TransactionHistory
                  assetId={id}
                  currency={currency}
                  isEditing={isEditing}
                  fetcher={transactionFetcher}
                  transactionsFormId={`transactions-form-${id}`}
                />
              </div>
            </div>

            {!isEditing ? (
              <button
                onClick={handleEditClick}
                className="text-sm text-accent hover:text-accent-dark float-right mt-4"
              >
                Edytuj szczegóły
              </button>
            ) : (
              <div className="flex justify-end mt-4 gap-2">
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="px-3 py-1 bg-gray-100 text-gray-600 rounded hover:bg-gray-200"
                >
                  Anuluj
                </button>
                <button
                  type="button"
                  onClick={handleSubmitAssetForm}
                  className="px-3 py-1 bg-accent text-white rounded hover:bg-accent/90"
                >
                  Zapisz{" "}
                  {getMarkedTransactionsCount() > 0 &&
                    `(${getMarkedTransactionsCount()} do usunięcia)`}
                </button>
              </div>
            )}
          </td>
        </tr>
      )}
    </>
  );
}
