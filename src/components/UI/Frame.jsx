import { motion } from "framer-motion";

export default function Frame({ label, isLoading = false, children }) {
  // Usuń tę linię na produkcji
  // isLoading = true;

  return (
    <div className="flex flex-col justify-center border-secondary border-2 rounded-[15px] pl-8 pt-6 pb-6 shadow-sm relative overflow-hidden">
      <span className="text-accent text-base mb-4">{label}</span>

      {isLoading ? (
        <div className="relative">
          <span className="text-3xl font-semibold opacity-0">Ładowanie...</span>

          <div className="absolute inset-0 flex items-center pr-8">
            <div className="h-8 w-full bg-gray-200 rounded blur-[1px] relative overflow-hidden">
              <motion.div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)",
                  backgroundSize: "200% 100%",
                }}
                animate={{
                  backgroundPosition: ["200% 0", "-200% 0"],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                  ease: "linear",
                }}
              />
            </div>
          </div>
        </div>
      ) : (
        children
      )}
    </div>
  );
}
