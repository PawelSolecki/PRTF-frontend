import { Link, redirect, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import Modal from "../UI/Modal.jsx";
import HoldingForm from "./HoldingForm.jsx";

export default function AddHolding() {
  const navigate = useNavigate();
  const { portfolioId } = useParams();
  const { accessToken } = useAuth();

  function handleClose() {
    // Jawne określenie docelowej ścieżki
    navigate(`/portfolio/${portfolioId}`);
  }

  return (
    <Modal onClose={handleClose}>
      <HoldingForm
        action={`/portfolio/${portfolioId}/add`}
        accessToken={accessToken}
      >
        <Link to={`/portfolio/${portfolioId}`}>Anuluj</Link>
        <button type="submit">Potwierdz</button>
      </HoldingForm>
    </Modal>
  );
}

export function loader({ params }) {}
export async function action({ request, params }) {
  console.log("action", params);
  const data = await request.formData();

  // Pobierz token z formData
  const accessToken = data.get("accessToken");

  const assetData = {
    portfolioId: params.portfolioId,
    type: data.get("type"),
    name: data.get("name"),
    broker: data.get("broker"),
    currency: data.get("currency"),
    pricePerUnit: data.get("pricePerUnit"),
    market: data.get("market"),
    ticker: data.get("ticker"),
  };

  // Przygotuj nagłówki z tokenem
  const headers = {
    "Content-Type": "application/json",
  };

  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }

  const assetsResponse = await fetch(`http://localhost:8090/api/v1/asset`, {
    method: "POST",
    credentials: "include",
    headers,
    body: JSON.stringify(assetData),
  });
  console.log("assetsResponse", assetsResponse);

  if (!assetsResponse.ok) {
    return new Response(
      JSON.stringify({
        message: "Nie udało się dodać aktywa",
      }),
      {
        status: 500,
      }
    );
  }

  const transactionData = {
    assetId: assetsResponse.headers.get("location").split("/").pop(),
    type: "BUY",
    quantity: data.get("quantity"),
    pricePerUnit: data.get("pricePerUnit"),
    date: `${data.get("date")}:00.000`,
  };
  const transactionsResponse = await fetch(
    `http://localhost:8090/api/v1/transaction`,
    {
      method: "POST",
      credentials: "include",
      headers,
      body: JSON.stringify(transactionData),
    }
  );

  if (!transactionsResponse.ok) {
    return new Response(
      JSON.stringify({
        message: "Nie udało się dodać aktywa",
      }),
      {
        status: 500,
      }
    );
  }

  return redirect(`/portfolio/${params.portfolioId}`);
}
