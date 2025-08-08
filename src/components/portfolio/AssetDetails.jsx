import { useEffect, useState } from "react";
import { useInput } from "../../hooks/useInput";
import { isNotEmpty } from "../../utils/validation";

const DetailItem = ({
  label,
  value,
  isEditing,
  name,
  onChange,
  onBlur,
  hasError,
  required = false,
}) => {
  if (!isEditing) {
    return (
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="font-medium">{value}</p>
      </div>
    );
  }

  return (
    <div>
      <label className="text-sm text-gray-500">
        {label}
        {required && " *"}
      </label>
      <input
        className={`w-full p-2 border rounded focus:outline-none focus:ring-1 ${
          hasError ? "border-red-500 bg-red-50" : "focus:ring-accent"
        }`}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        required={required}
      />
      {hasError && (
        <p className="text-xs text-red-500 mt-1">To pole jest wymagane</p>
      )}
    </div>
  );
};

// Asset details display and edit component
export default function AssetDetails({ asset, isEditing, formId }) {
  // Use useInput hook for each field with validation
  const {
    value: nameValue,
    handleInputChange: handleNameChange,
    handleInputBlur: handleNameBlur,
    hasError: nameHasError,
  } = useInput(asset.name, isNotEmpty);

  const {
    value: tickerValue,
    handleInputChange: handleTickerChange,
    handleInputBlur: handleTickerBlur,
  } = useInput(asset.ticker || "", () => true);

  const {
    value: typeValue,
    handleInputChange: handleTypeChange,
    handleInputBlur: handleTypeBlur,
    hasError: typeHasError,
  } = useInput(asset.type, isNotEmpty);

  const {
    value: marketValue,
    handleInputChange: handleMarketChange,
    handleInputBlur: handleMarketBlur,
  } = useInput(asset.market || "", () => true);

  const {
    value: brokerValue,
    handleInputChange: handleBrokerChange,
    handleInputBlur: handleBrokerBlur,
    hasError: brokerHasError,
  } = useInput(asset.broker, isNotEmpty);

  const {
    value: currencyValue,
    handleInputChange: handleCurrencyChange,
    handleInputBlur: handleCurrencyBlur,
    hasError: currencyHasError,
  } = useInput(asset.currency, isNotEmpty);

  // Quantity is read-only, calculated from transaction history
  const quantity = asset.totalQuantity || 0;

  // Editable state for pricePerUnit and totalValue
  const [pricePerUnit, setPricePerUnit] = useState(asset.pricePerUnit || 0);
  const [totalValue, setTotalValue] = useState(
    quantity * (asset.pricePerUnit || 0)
  );

  // When pricePerUnit changes, update totalValue
  useEffect(() => {
    setTotalValue(Number(quantity) * Number(pricePerUnit));
  }, [quantity, pricePerUnit]);

  // When totalValue changes, update pricePerUnit (if user changed totalValue)
  const handleTotalValueChange = (e) => {
    const newTotalValue = e.target.value;
    setTotalValue(newTotalValue);
    // Avoid division by zero
    if (Number(quantity) !== 0) {
      setPricePerUnit(Number(newTotalValue) / Number(quantity));
    }
  };

  // When pricePerUnit changes, update totalValue
  const handlePricePerUnitChange = (e) => {
    const newPrice = e.target.value;
    setPricePerUnit(newPrice);
    setTotalValue(Number(quantity) * Number(newPrice));
  };

  return (
    <form
      id={formId}
      className="bg-white p-4 rounded-lg shadow-sm"
      onClick={(e) => e.stopPropagation()}
      method="post"
    >
      {/* Dodaj ukryte pole z ID aktywa, aby było dostępne w akcji */}
      <input type="hidden" name="assetId" value={asset.id} />

      <div className="grid grid-cols-2 gap-4">
        <DetailItem
          label="Nazwa"
          value={nameValue}
          isEditing={isEditing}
          name="name"
          onChange={handleNameChange}
          onBlur={handleNameBlur}
          hasError={nameHasError}
          required={true}
        />
        <DetailItem
          label="Ticker"
          value={tickerValue}
          isEditing={isEditing}
          name="ticker"
          onChange={handleTickerChange}
          onBlur={handleTickerBlur}
        />
        <DetailItem
          label="Typ"
          value={typeValue}
          isEditing={isEditing}
          name="type"
          onChange={handleTypeChange}
          onBlur={handleTypeBlur}
          hasError={typeHasError}
          required={true}
        />
        <DetailItem
          label="Rynek"
          value={marketValue}
          isEditing={isEditing}
          name="market"
          onChange={handleMarketChange}
          onBlur={handleMarketBlur}
        />
        <DetailItem
          label="Broker"
          value={brokerValue}
          isEditing={isEditing}
          name="broker"
          onChange={handleBrokerChange}
          onBlur={handleBrokerBlur}
          hasError={brokerHasError}
          required={true}
        />
        <DetailItem
          label="Waluta"
          value={currencyValue}
          isEditing={isEditing}
          name="currency"
          onChange={handleCurrencyChange}
          onBlur={handleCurrencyBlur}
          hasError={currencyHasError}
          required={true}
        />
        {!isEditing && (
          <DetailItem
            label="Ilość"
            value={quantity}
            isEditing={false}
            name="totalQuantity"
          />
        )}
        <DetailItem
          label="Cena jednostkowa"
          value={pricePerUnit}
          isEditing={isEditing}
          name="pricePerUnit"
          onChange={handlePricePerUnitChange}
          required={true}
        />
        <DetailItem
          label="Wartość całkowita"
          value={totalValue}
          isEditing={isEditing}
          name="totalValue"
          onChange={handleTotalValueChange}
          required={true}
        />
      </div>
      {/* Hidden fields for PATCH */}
      <input type="hidden" name="name" value={nameValue} />
      <input type="hidden" name="ticker" value={tickerValue} />
      <input type="hidden" name="type" value={typeValue} />
      <input type="hidden" name="market" value={marketValue} />
      <input type="hidden" name="broker" value={brokerValue} />
      <input type="hidden" name="currency" value={currencyValue} />
      <input type="hidden" name="pricePerUnit" value={pricePerUnit} />
    </form>
  );
}

// Loader to fetch asset data
export async function loader({ params }) {
  const response = await fetch(
    `http://localhost:8090/api/v1/asset/${params.assetId}`,
    {
      credentials: "include",
    }
  );

  if (!response.ok) {
    throw new Response(
      JSON.stringify({ message: "Nie udało się załadować danych aktywa" }),
      {
        status: 404,
      }
    );
  }

  return response.json();
}

export async function action({ request, params }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const payload = {
    type: data.type,
    name: data.name,
    broker: data.broker,
    pricePerUnit: Number(data.pricePerUnit),
    currency: data.currency,
    market: data.market,
    ticker: data.ticker,
  };

  const response = await fetch(
    `http://localhost:8090/api/v1/asset/${params.assetId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        credentials: "include",
      },
      body: JSON.stringify(payload),
    }
  );

  if (!response.ok) {
    throw new Response(
      JSON.stringify({ message: "Nie udało się zaktualizować aktywa" }),
      { status: 400 }
    );
  }
  return null;
}
