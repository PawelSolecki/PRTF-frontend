import { useState } from "react";
import Modal from "../UI/Modal";

export default function TransactionForm({ type }) {
  return (
    <Modal>
      <p>{type}</p>
    </Modal>
  );
}
