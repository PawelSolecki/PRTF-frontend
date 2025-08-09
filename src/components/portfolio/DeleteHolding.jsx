import { Form, redirect, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { useApi } from "../../hooks/useApi.js";
import Modal from "../UI/Modal";

export default function DeleteHolding() {
  const navigate = useNavigate();
  const { holdingId } = useParams();
  const { accessToken } = useAuth();

  const {
    data: holding,
    isLoading,
    error,
  } = useApi({
    url: `http://localhost:8090/api/v1/asset/${holdingId}`,
    queryKey: ["asset", holdingId],
  });

  function handleClose() {
    navigate("..");
  }

  if (isLoading) {
    return (
      <Modal onClose={handleClose}>
        <div className="flex justify-center">
          <p>Ładowanie...</p>
        </div>
      </Modal>
    );
  }

  if (error || !holding) {
    return (
      <Modal onClose={handleClose}>
        <div className="flex justify-center">
          <p>Błąd ładowania danych aktywa</p>
        </div>
      </Modal>
    );
  }

  return (
    <Modal onClose={handleClose}>
      <div className="flex flex-col items-center">
        <h2 className="text-2xl font-bold text-accent mb-4">
          Potwierdź usunięcie
        </h2>

        <div className="mb-6 text-center">
          <p className="text-lg mb-2">Czy na pewno chcesz usunąć to aktywo?</p>
          <div className="bg-basic-100 p-4 rounded-lg">
            <p className="font-bold text-accent">{holding.name}</p>
            <p className="text-sm text-gray-600">{holding.ticker}</p>
            <p className="mt-2">Ilość: {holding.totalQuantity}</p>
            <p>Cena jednostkowa: {holding.pricePerUnit}</p>
          </div>
        </div>

        <div className="flex space-x-4">
          <button
            onClick={handleClose}
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
          >
            Anuluj
          </button>
          <Form method="delete">
            {/* Ukryte pole z tokenem */}
            {accessToken && (
              <input type="hidden" name="accessToken" value={accessToken} />
            )}
            <button
              type="submit"
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              Usuń
            </button>
          </Form>
        </div>
      </div>
    </Modal>
  );
}

export async function action({ request, params }) {
  const formData = await request.formData();

  // Pobierz token z formData
  const accessToken = formData.get("accessToken");

  // Przygotuj nagłówki z tokenem
  const headers = {
    "Content-Type": "application/json",
  };

  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }

  const assetsResponse = await fetch(
    `http://localhost:8090/api/v1/asset/${params.holdingId}`,
    {
      method: "DELETE",
      credentials: "include",
      headers,
    }
  );

  if (!assetsResponse.ok) {
    return new Response(
      JSON.stringify({
        message: "Nie udało się usunąć aktywa",
      }),
      {
        status: 500,
      }
    );
  }

  return redirect("..");
}
