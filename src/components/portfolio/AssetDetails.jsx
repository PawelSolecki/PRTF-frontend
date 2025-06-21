import { useInput } from "../../hooks/useInput";
import { isNotEmpty } from "../../utils/validation";
import { Form, redirect } from "react-router-dom";

// Helper component for details display/edit
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

  return (
    <form
      id={formId}
      className="bg-white p-4 rounded-lg shadow-sm"
      onClick={(e) => e.stopPropagation()}
      onSubmit={(e) => {
        e.preventDefault();
      }}
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
          <>
            <DetailItem
              label="Ilość"
              value={asset.totalQuantity}
              isEditing={false}
            />
            <DetailItem
              label="Cena jednostkowa"
              value={`${asset.pricePerUnit} ${asset.currency}`}
              isEditing={false}
            />
          </>
        )}
      </div>
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

// Action to update asset data
export async function action({ request, params }) {
  console.log("Form data asset update PATCH request received");
  const formData = await request.formData();

  // Wypisz wszystkie dane formularza
  const formDataObj = Object.fromEntries(formData);
  console.log("Form data:", formDataObj);

  // W przyszłości tutaj dodasz kod do wysyłania danych do API

  return null;
}
