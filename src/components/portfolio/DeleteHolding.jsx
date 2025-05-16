import { Form, redirect, useLoaderData, useNavigate } from "react-router-dom";
import Modal from "../UI/Modal";

export default function DeleteHolding() {
  const holding = useLoaderData();
  const navigate = useNavigate();

  function handleClose() {
    navigate("..");
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

export async function loader({ params }) {
  const response = await fetch(
    `http://localhost:8090/api/v1/asset/${params.holdingId}`,
    {
      credentials: "include",
    }
  );

  if (!response.ok) {
    throw new Response(
      JSON.stringify({ message: "Nie udało się pobrać danych aktywa" }),
      { status: 404 }
    );
  }

  return response.json();
}

export async function action({ request, params }) {
  const assetsResponse = await fetch(
    `http://localhost:8090/api/v1/asset/${params.holdingId}`,
    {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
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
