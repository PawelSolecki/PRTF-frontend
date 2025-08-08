import { X } from "lucide-react";
import { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useApi } from "../../hooks/useApi";
import { useInput } from "../../hooks/useInput";
import Input from "../UI/Input";
import Modal from "../UI/Modal";

export default function AddFunds() {
  const navigate = useNavigate();
  const { portfolioId } = useParams();

  const {
    value: funds,
    handleInputChange,
    handleInputBlur,
    hasError,
  } = useInput("", () => {});

  const { data, isLoading, refetch } = useApi({
    url: `http://localhost:8090/api/v1/analysis/rebalance/${portfolioId}?additionalInvestment=${funds}`,
    method: "GET",
    customMessages: {
      500: "Błąd serwera podczas dodawania funduszy",
      401: "Brak autoryzacji do dodania funduszy",
      default: "Nie udało się dodać funduszy",
    },
    manual: true,
  });

  const debounceRef = useRef();

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (funds && !hasError && Number(funds) > 0) {
      debounceRef.current = setTimeout(refetch, 500);
    }
  }, [funds, hasError]);

  return (
    <Modal onClose={() => navigate(`/portfolio/${portfolioId}`)}>
      <button
        onClick={() => navigate(`/portfolio/${portfolioId}`)}
        className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 z-10"
        aria-label="Zamknij"
      >
        <X size={22} />
      </button>
      <div className="p-0 w-full max-w-md mx-auto">
        <Input
          label="Kwota którą chcesz dodać"
          id="funds"
          type="number"
          value={funds}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          min={0}
          step={1}
          autoFocus
        />
        {funds && !hasError && Number(funds) > 0 && isLoading && (
          <div className="mt-6 text-center text-gray-500">Sprawdzanie...</div>
        )}
        {data?.balancedInvestment && !isLoading && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">
              Nowy podział inwestycji:
            </h3>
            <table className="w-full text-sm border rounded">
              <thead>
                <tr className="border-b">
                  <th className="py-2 px-4 text-left">Typ aktywa</th>
                  <th className="py-2 px-4 text-left">Kwota (PLN)</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(data.balancedInvestment).map(
                  ([type, amount]) => (
                    <tr key={type} className="border-b last:border-b-0">
                      <td className="py-2 px-4">{type}</td>
                      <td className="py-2 px-4">
                        {amount.toLocaleString("pl-PL", {
                          style: "currency",
                          currency: "PLN",
                        })}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Modal>
  );
}
