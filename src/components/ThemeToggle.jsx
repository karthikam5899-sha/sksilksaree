import { Moon, Sun } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function ThemeToggle() {
  const { dark, setDark } = useTheme();
  return (
    <button
      onClick={() => setDark(!dark)}
      className="rounded-full border border-silk-200 bg-white p-2.5 text-slate-700 transition hover:scale-105 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
      aria-label="Toggle theme"
    >
      {dark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}