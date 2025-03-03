import { Link, useNavigate, useParams } from "react-router-dom";
import Modal from "../UI/Modal.jsx";
import HoldingForm from "./HoldingForm.jsx";

// AddHolding.jsx
export default function AddHolding() {
  const navigate = useNavigate();
  const { portfolioId } = useParams(); // Dodaj to

  function handleClose() {
    // Jawne określenie docelowej ścieżki
    navigate(`/portfolio/${portfolioId}`);
  }

  return (
    <Modal onClose={handleClose}>
      <HoldingForm>
        <Link to={`/portfolio/${portfolioId}`}>Anuluj</Link>
        <button>Potwierdz</button>
      </HoldingForm>
    </Modal>
  );
}

export function loader({ params }) {}
export async function action({ request, params }) {}
