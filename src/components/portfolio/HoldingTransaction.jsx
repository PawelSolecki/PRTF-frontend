import Modal from "../UI/Modal";
import TransactionForm from "./TransactionForm";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function HoldingTransaction() {
  const navigate = useNavigate();
  const { portfolioId } = useParams(); // Dodaj to

  function handleClose() {
    // Jawne określenie docelowej ścieżki
    navigate(`/portfolio/${portfolioId}`);
  }
  return (
    <Modal onClose={handleClose}>
      <TransactionForm>
        <Link to={`/portfolio/${portfolioId}`}>Anuluj</Link>
        <button>Potwierdz</button>
      </TransactionForm>
    </Modal>
  );
}
