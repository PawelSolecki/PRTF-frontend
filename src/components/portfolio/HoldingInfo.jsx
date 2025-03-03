import { useNavigate, useParams, Link } from "react-router-dom";
import HoldingForm from "./HoldingForm";
import Modal from "../UI/Modal";

export default function HoldingInfo() {
  const navigate = useNavigate();
  const { portfolioId } = useParams();

  function handleClose() {
    navigate(`/portfolio/${portfolioId}`);
  }

  return (
    <Modal onClose={handleClose}>
      <HoldingForm>
        <p>Info o aktywie</p>
        <Link to={`/portfolio/${portfolioId}`}>Anuluj</Link>
        <button>Potwierdz</button>
      </HoldingForm>
    </Modal>
  );
}

export function loader({ params }) {}
export async function action({ request, params }) {}
