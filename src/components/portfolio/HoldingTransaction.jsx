import { redirect, useNavigate, useParams } from "react-router-dom";
import Modal from "../UI/Modal";
import TransactionForm from "./TransactionForm";

export default function HoldingTransaction() {
  const navigate = useNavigate();
  const { portfolioId } = useParams();

  function handleClose() {
    navigate(`/portfolio/${portfolioId}`);
  }

  return (
    <Modal onClose={handleClose}>
      <TransactionForm action="">
        <button
          type="button"
          onClick={handleClose}
          className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
        >
          Anuluj
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition"
        >
          Potwierdź
        </button>
      </TransactionForm>
    </Modal>
  );
}

export async function loader() {
  return null;
}

export async function action({ request, params }) {
  const formData = await request.formData();
  const { holdingId, portfolioId } = params;

  const transactionData = {
    type: formData.get("transactionType"),
    quantity: parseFloat(formData.get("quantity")),
    pricePerUnit: parseFloat(formData.get("pricePerUnit")),
    date: formData.get("date"),
    assetId: holdingId,
  };

  // API call to add a transaction
  const response = await fetch(`http://localhost:8090/api/v1/transaction`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(transactionData),
  });

  if (!response.ok) {
    // Handle error
    return new Response(
      JSON.stringify({
        message: "Nie udało się dodać transakcji",
      }),
      {
        status: response.status,
      }
    );
  }

  return redirect(`/portfolio/${portfolioId}`);
}
