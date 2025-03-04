const labelClass = "block text-dark text-sm font-medium mb-2";
const inputClass = "border-2 border-secondary rounded-[10px] p-2 w-full";

export default function HoldingForm({ children }) {
  return (
    <>
      <h1 className="text-2xl font-semibold mb-6">Dodaj nowe aktywo</h1>
      <form className="space-y-6">
        <div>
          <label className={labelClass}>Nazwa *</label>
          <input className={inputClass} required />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className={labelClass}>Ilość *</label>
            <input className={inputClass} required />
          </div>
          <div>
            <label className={labelClass}>Cena *</label>
            <input className={inputClass} required />
          </div>
          <div>
            <label className={labelClass}>Waluta *</label>
            <input className={inputClass} required />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Rynek *</label>
            <input className={inputClass} required />
          </div>
          <div>
            <label className={labelClass}>Ticker *</label>
            <input className={inputClass} required />
          </div>
        </div>
        <div>
          <label className={labelClass}>Dom Maklerski</label>
          <input className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Data Zakupu</label>
          <input className={inputClass} type="date" />
        </div>
        <p className="flex justify-end gap-4">{children}</p>
      </form>
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
