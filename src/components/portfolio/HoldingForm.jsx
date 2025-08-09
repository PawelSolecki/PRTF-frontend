import { Form } from "react-router-dom";
import { useInput } from "../../hooks/useInput";
import { isNotEmpty } from "../../utils/validation";
import Input from "../UI/Input";

export default function HoldingForm({ action, children, accessToken }) {
  const {
    value: nameValue,
    handleInputChange: handleNameChange,
    handleInputBlur: handleNameBlur,
    hasError: nameHasError,
  } = useInput("", (value) => isNotEmpty(value));

  const {
    value: typeValue,
    handleInputChange: handleTypeChange,
    handleInputBlur: handleTypeBlur,
    hasError: typeHasError,
  } = useInput("", (value) => isNotEmpty(value));
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
    value: currencyValue,
    handleInputChange: handleCurrencyChange,
    handleInputBlur: handleCurrencyBlur,
    hasError: currencyHasError,
  } = useInput("", (value) => isNotEmpty(value));
  const {
    value: marketValue,
    handleInputChange: handleMarketChange,
    handleInputBlur: handleMarketBlur,
    hasError: marketHasError,
  } = useInput("", () => true);
  const {
    value: tickerValue,
    handleInputChange: handleTickerChange,
    handleInputBlur: handleTickerBlur,
    hasError: tickerHasError,
  } = useInput("", () => true);
  const {
    value: brokerValue,
    handleInputChange: handleBrokerChange,
    handleInputBlur: handleBrokerBlur,
    hasError: brokerHasError,
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
      <h1 className="text-2xl font-semibold mb-6">Dodaj nowe aktywo</h1>
      <Form method="post" action={action} className="space-y-6">
        {/* Ukryte pole z tokenem */}
        {accessToken && (
          <input type="hidden" name="accessToken" value={accessToken} />
        )}
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Nazwa *"
            id="name"
            name="name"
            error={nameHasError && "Nazwa jest wymagana"}
            type="text"
            value={nameValue}
            onChange={handleNameChange}
            onBlur={handleNameBlur}
            placeholder="Nazwa aktywa"
            required
          />

          <Input
            label="Rodzaj *"
            id="type"
            name="type"
            error={typeHasError && "Rodzaj jest wymagany"}
            type="text"
            value={typeValue}
            onChange={handleTypeChange}
            onBlur={handleTypeBlur}
            placeholder="Akcje, ETF, Obligacje"
            required
          />
        </div>
        <div className="grid grid-cols-3 gap-4">
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
            label="Cena za jeden *"
            id="pricePerUnit"
            name="pricePerUnit"
            error={priceHasError && "Cena jest wymagana"}
            type="number"
            value={priceValue}
            onChange={handlePriceChange}
            onBlur={handlePriceBlur}
            required
          />
          <Input
            label="Waluta *"
            id="currency"
            name="currency"
            error={currencyHasError && "Waluta jest wymagana"}
            type="text"
            value={currencyValue}
            onChange={handleCurrencyChange}
            onBlur={handleCurrencyBlur}
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Rynek"
            id="market"
            name="market"
            error={marketHasError && "Rynek jest wymagany"}
            type="text"
            value={marketValue}
            onChange={handleMarketChange}
            onBlur={handleMarketBlur}
            placeholder="GPW, NYSE, NASDAQ"
            required
          />
          <Input
            label="Ticker"
            id="ticker"
            name="ticker"
            error={tickerHasError && "Ticker jest wymagany"}
            type="text"
            value={tickerValue}
            onChange={handleTickerChange}
            onBlur={handleTickerBlur}
            placeholder="AAPL, MSFT, AMZN"
            required
          />
        </div>

        <Input
          label="Dom maklerski *"
          id="broker"
          name="broker"
          error={brokerHasError && "Broker jest wymagany"}
          type="text"
          value={brokerValue}
          onChange={handleBrokerChange}
          onBlur={handleBrokerBlur}
          placeholder="XTB, mBank, ING"
          required
        />

        <Input
          label="Data zakupu *"
          id="date"
          name="date"
          error={dateHasError && "Data zakupu jest wymagana"}
          type="datetime-local"
          value={dateValue}
          onChange={handleDateChange}
          onBlur={handleDateBlur}
          required
        />
        <p className="flex justify-end gap-4">{children}</p>
      </Form>
    </>
  );
}

//Name
//market
// ticker
// ilosc
// cena
// dom maklerski
// waluta
