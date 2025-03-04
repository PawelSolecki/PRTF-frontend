import { useNavigate, useParams, Link } from "react-router-dom";
import Modal from "../UI/Modal";

export default function HoldingInfo() {
  const navigate = useNavigate();
  const { portfolioId } = useParams();

  function handleClose() {
    navigate(`/portfolio/${portfolioId}`);
  }
  const assetName = "Apple Inc";
  const market = "NASDAQ";
  const ticker = "AAPL";
  const price = 283.0;
  const currency = "$";
  const amount = 2;
  const transactions = [
    {
      date: "14.12.2023",
      type: "Buy",
      amount: "2",
    },
    {
      date: "13.12.2023",
      type: "sell",
      amount: "2",
    },
    {
      date: "12.12.2023",
      type: "Buy",
      amount: "4",
    },
  ];

  return (
    <Modal onClose={handleClose}>
      <div className="m-4">
        <div className="flex justify-between items-start mb-6 gap-2">
          <div>
            <h2 className="text-3xl font-semibold mb-2">{assetName}</h2>
            <p className="text-accent text-sm">
              {market}:{ticker}
            </p>
          </div>
          <button className="text-sm text-accent border-secondary border-2 rounded-md px-4 py-2 hover:bg-secondary">
            Edytuj
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <span className="text-accent text-sm">Ilość:</span>
            <p className="font-semibold text-lg">{amount}</p>
          </div>
          <div>
            <span className="text-accent text-sm">Cena:</span>
            <p className="font-semibold text-lg">
              {price} {currency}
            </p>
          </div>
        </div>
        <h3 className="text-xl font-semibold mb-4">Historia transakcji</h3>
        <ul className="border-t border-secondary pt-4 space-y-2">
          {transactions.map((transaction, index) => (
            <li key={index} className="text-sm">
              {transaction.date} - {transaction.type} - {transaction.amount}{" "}
              {currency}
            </li>
          ))}
        </ul>
      </div>
    </Modal>
  );
}

export function loader({ params }) {}
export async function action({ request, params }) {}
