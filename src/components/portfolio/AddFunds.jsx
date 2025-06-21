import Modal from "../UI/Modal";
import { useInput } from "../../hooks/useInput";
import Input from "../UI/Input";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom"; // Importuj useParams

export default function AddFunds() {
  const navigate = useNavigate();
  const { portfolioId } = useParams(); // Dodaj to

  function handleClose() {
    // Jawne określenie docelowej ścieżki
    navigate(`/portfolio/${portfolioId}`);
  }
  const {
    value: funds,
    handleInputChange: handleFundsChange,
    handleInputBlur: handleFundsBlur,
    hasError: fundsHasError,
  } = useInput(100, () => {});
  return (
    <Modal on onClose={handleClose}>
      <Input
        label="Kwota do dodania"
        id="funds"
        type="number"
        value={funds}
        onChange={handleFundsChange}
        onBlur={handleFundsBlur}
        error={fundsHasError ? "Kwota musi być większa niż 0" : ""}
      ></Input>
      <button>sprawdz</button>
    </Modal>
  );
}
