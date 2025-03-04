import { useState } from "react";

export default function TransactionForm({ children }) {
  const [transactionType, setTransactionType] = useState("BUY");

  const sharedInputStyle =
    "border border-secondary rounded-md px-4 py-2 w-full";
  const labelStyle = "text-sm text-accent";

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <span className="text-2xl font-semibold">Nowa Transakcja</span>
        <div className="flex gap-4">
          <button
            className={`px-4 py-2 rounded-lg ${
              transactionType === "BUY"
                ? "bg-accent text-white"
                : "bg-secondary"
            }`}
            onClick={() => setTransactionType("BUY")}
          >
            Kupno
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${
              transactionType === "SELL"
                ? "bg-accent text-white"
                : "bg-secondary"
            }`}
            onClick={() => setTransactionType("SELL")}
          >
            Sprzedaż
          </button>
        </div>
      </div>

      <form className="flex flex-col gap-4">
        <div>
          <label className={labelStyle}>Ilość</label>
          <input type="number" className={sharedInputStyle} />
        </div>
        <div>
          <label className={labelStyle}>Cena</label>
          <input type="number" className={sharedInputStyle} />
        </div>
        <div>
          <label className={labelStyle}>Data</label>
          <input type="date" className={sharedInputStyle} />
        </div>
        <div>{children}</div>
      </form>
    </>
  );
}
