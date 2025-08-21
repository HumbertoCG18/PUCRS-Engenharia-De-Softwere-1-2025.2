// src/components/ThemeSwitcher.jsx
"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

export const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Evita renderizar o botão no servidor para não dar erro de hidratação
    return <div className="w-14 h-8" />;
  }

  const isDark = theme === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <button
      onClick={toggleTheme}
      className={`relative inline-flex items-center h-8 w-14 rounded-full transition-colors bg-gray-200 dark:bg-gray-700`}
    >
      <span className="sr-only">Mudar tema</span>
      <span
        className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
          isDark ? "translate-x-7" : "translate-x-1"
        }`}
      />
      <Sun className={`absolute left-2 h-4 w-4 text-yellow-500 transition-opacity ${isDark ? 'opacity-0' : 'opacity-100'}`} />
      <Moon className={`absolute right-2 h-4 w-4 text-blue-300 transition-opacity ${isDark ? 'opacity-100' : 'opacity-0'}`} />
    </button>
  );
};