//TODO: Lepsze ikonki
import Logo from "../assets/Logo.png";
import QuestionMark from "../assets/QuestionMark.png";
import Bell from "../assets/Bell.png";
import User from "../assets/User.png";

export default function MainNavigation() {
  const iconBackgroundStyles =
    "bg-secondary w-10 h-10 flex justify-center items-center rounded-lg";
  const linkStyles =
    "cursor-pointer text-xl underline text-accent hover:text-secondary-400";
  return (
    <header className="p-4 border-b-2">
      <nav className="flex justify-between m-auto">
        {/* Lewa strona */}
        <div className="flex items-center gap-4">
          <img src={Logo} alt="logo" className="w-[20%]" />
          <span className="text-2xl font-semibold">Domena.pl</span>
        </div>

        {/* Środek - Nawigacja obok prawej strony */}
        <div className="flex items-center gap-8">
          <ul className="flex gap-8">
            <li className={linkStyles}>Jakieś</li>
            <li className={linkStyles}>Inne</li>
            <li className={linkStyles}>Zakładki</li>
          </ul>

          {/* Prawa strona */}
          <div className="flex items-center gap-5">
            <div className={iconBackgroundStyles}>
              <img src={QuestionMark} alt="?" className="w-4 h-6" />
            </div>
            <div className={iconBackgroundStyles}>
              <img src={Bell} alt="notification" className="w-6 h-7" />
            </div>
            <div className={iconBackgroundStyles}>
              <img src={User} alt="login" className="w-7 h-7" />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
