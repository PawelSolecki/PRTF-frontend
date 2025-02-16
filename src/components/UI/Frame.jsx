export default function Frame({ label, value }) {
  return (
    <div className="flex flex-col justify-center border-secondary border-2 rounded-[15px] pl-8 pt-6 pb-6 shadow-sm">
      <span className="text-accent text-base mb-4">{label}</span>
      <span className="text-3xl font-semibold">{value}</span>
    </div>
  );
}
