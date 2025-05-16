import { useInput } from "../../hooks/useInput";
import { isNotEmpty } from "../../utils/validation";
import Input from "../UI/Input";
import { Form } from "react-router-dom";

export default function TransactionForm({ children, action }) {
  const {
    value: transactionType,
    handleInputChange: handleTransactionTypeChange,
  } = useInput("BUY", () => true);

  const {
    value: quantityValue,
    handleInputChange: handleQuantityChange,
    handleInputBlur: handleQuantityBlur,
    hasError: quantityHasError,
  } = useInput("", (value) => isNotEmpty(value));

  const {
    value: priceValue,
    handleInputChange: handlePriceChange,
    handleInputBlur: handlePriceBlur,
    hasError: priceHasError,
  } = useInput("", (value) => isNotEmpty(value));

  const {
    value: dateValue,
    handleInputChange: handleDateChange,
    handleInputBlur: handleDateBlur,
    hasError: dateHasError,
  } = useInput(`${new Date().toISOString().split("T")[0]}T12:00`, (value) =>
    isNotEmpty(value)
  );

  return (
    <>
      <div className="mb-6">
        <span className="text-2xl font-semibold block mb-4">
          Nowa Transakcja
        </span>

        <Form method="post" action={action} className="space-y-6">
          {/* First row - Type and Date side by side */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="transactionType"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Typ transakcji *
              </label>
              <select
                id="transactionType"
                name="transactionTypeSelect"
                value={transactionType}
                onChange={handleTransactionTypeChange}
                className="block w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:outline-none"
              >
                <option value="BUY" className="text-myGreen">
                  Kupno
                </option>
                <option value="SELL" className="text-myRed">
                  Sprzedaż
                </option>
              </select>
              <input
                type="hidden"
                name="transactionType"
                value={transactionType}
              />
            </div>

            <div>
              <Input
                label="Data transakcji *"
                id="date"
                name="date"
                error={dateHasError && "Data transakcji jest wymagana"}
                type="datetime-local"
                value={dateValue}
                onChange={handleDateChange}
                onBlur={handleDateBlur}
                required
              />
            </div>
          </div>

          {/* Second row - Quantity and Price side by side */}
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Ilość *"
              id="quantity"
              name="quantity"
              error={quantityHasError && "Ilość jest wymagana"}
              type="number"
              value={quantityValue}
              onChange={handleQuantityChange}
              onBlur={handleQuantityBlur}
              required
            />

            <Input
              label="Cena jednostkowa *"
              id="pricePerUnit"
              name="pricePerUnit"
              error={priceHasError && "Cena jest wymagana"}
              type="number"
              value={priceValue}
              onChange={handlePriceChange}
              onBlur={handlePriceBlur}
              required
            />
          </div>

          <p className="flex justify-end gap-4 mt-6">{children}</p>
        </Form>
      </div>
    </>
  );
}
