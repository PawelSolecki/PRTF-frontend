import { useNavigate, useParams, useLoaderData, Form } from "react-router-dom";
import Modal from "../UI/Modal";
import Input from "../UI/Input";
import { useInput } from "../../hooks/useInput";
import { redirect } from "react-router-dom";

//TODO: Styles
export default function PortfolioEdit() {
  const navigate = useNavigate();
  const { portfolioId } = useParams();
  const assetTypes = useLoaderData();

  const {
    value: percentages,
    handleInputChange,
    handleInputBlur,
    hasError,
  } = useInput(
    assetTypes?.reduce((acc, type) => ({ ...acc, [type]: 0 }), {}),
    (vals) => {
      const numbers = Object.values(vals).map(Number);
      const allInRange = numbers.every((v) => !isNaN(v) && v >= 0 && v <= 100);
      const sumIs100 = numbers.reduce((a, b) => a + b, 0) === 100;
      return allInRange && sumIs100;
    }
  );

  function handleChange(e, type) {
    handleInputChange({
      target: {
        value: { ...percentages, [type]: e.target.value },
      },
    });
  }

  function handleBlur() {
    handleInputBlur();
  }

  function handleClose() {
    navigate(`/portfolio/${portfolioId}`);
  }

  if (!assetTypes || !Array.isArray(assetTypes) || assetTypes.length === 0) {
    return (
      <Modal onClose={handleClose}>
        <div className="p-4 text-center">Ładowanie danych...</div>
      </Modal>
    );
  }

  return (
    <Modal onClose={handleClose}>
      <Form
        method="post"
        className="w-full max-w-3xl mx-auto bg-white rounded-lg p-6"
      >
        <h1 className="text-xl font-bold text-accent mb-4 text-center">
          Edytuj portfel modelowy
        </h1>
        <table className="w-full mb-4">
          <thead>
            <tr>
              <th className="text-left text-gray-600 pb-1 font-normal">Typ</th>
              <th className="text-left text-gray-600 pb-1 font-normal">
                Procent
              </th>
            </tr>
          </thead>
          <tbody>
            {assetTypes.map((type) => (
              <tr key={type} className="even:bg-basic-100">
                <td className="px-2 py-1 font-medium text-accent uppercase text-sm">
                  {type}
                </td>
                <td className="px-2 py-1">
                  <Input
                    id={type}
                    name={type}
                    type="number"
                    min="0"
                    max="100"
                    value={percentages[type] ?? ""}
                    onChange={(e) => handleChange(e, type)}
                    onBlur={handleBlur}
                    error={hasError}
                    label={null}
                    placeholder="0"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {hasError && (
          <p className="text-red-600 text-center mb-3 font-medium text-sm">
            Suma musi być równa 100, każdy procent 0-100
          </p>
        )}
        <div className="flex justify-end gap-2 mt-4">
          <button
            type="button"
            onClick={handleClose}
            className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200 text-sm"
          >
            Anuluj
          </button>
          <button
            type="submit"
            className="px-3 py-1 bg-accent text-white rounded hover:bg-accent/90 text-sm"
            disabled={hasError}
          >
            Zapisz
          </button>
        </div>
      </Form>
    </Modal>
  );
}

export async function loader({ params }) {
  const response = await fetch(`http://localhost:8090/api/v1/asset/types`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Response(
      JSON.stringify({ message: "Nie udało się załadować transakcji" }),
      {
        status: 404,
      }
    );
  }

  return response.json();
}

export async function action({ request, params }) {
  const { portfolioId } = params;
  const formData = await request.formData();

  const allocations = [];
  for (const [assetType, value] of formData.entries()) {
    const percentage = Number(value);
    if (percentage !== 0) {
      allocations.push({
        assetType,
        percentage,
      });
    }
  }
  console.log("Allocations to save:", allocations);

  const response = await fetch(
    `http://localhost:8090/api/v1/portfolio-allocation/${portfolioId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ allocations }),
    }
  );

  if (!response.ok) {
    throw new Response(
      JSON.stringify({ message: "Nie udało się zapisać alokacji" }),
      { status: 400 }
    );
  }

  return redirect(`/portfolio/${portfolioId}`);
}
