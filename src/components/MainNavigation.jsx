export default function MainNavigation() {
  return (
    <header className="p-4 border-b-2">
      <nav className="flex justify-between m-auto">
        {/* Lewa strona */}
        <div className="flex items-center gap-4">
          <img src="https://placehold.co/50" alt="logo" />
          <span className="text-lg font-semibold">Domena.pl</span>
        </div>

        {/* Środek - Nawigacja obok prawej strony */}
        <div className="flex items-center gap-8">
          <ul className="flex gap-8">
            <li className="hover:text-blue-500 cursor-pointer">Jakieś</li>
            <li className="hover:text-blue-500 cursor-pointer">Inne</li>
            <li className="hover:text-blue-500 cursor-pointer">Zakładki</li>
          </ul>

          {/* Prawa strona */}
          <div className="flex items-center gap-3">
            <img src="https://placehold.co/50" alt="?" />
            <img src="https://placehold.co/50" alt="notification" />
            <img src="https://placehold.co/50" alt="login" />
          </div>
        </div>
      </nav>
    </header>
  );
}
