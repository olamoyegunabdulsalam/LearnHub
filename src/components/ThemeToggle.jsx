import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  // Load saved theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    } else {
      document.documentElement.classList.remove("dark");
      setIsDark(false);
    }
  }, []);

  const toggleTheme = () => {
    const html = document.documentElement;

    if (html.classList.contains("dark")) {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    } else {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="sticky rounded-2xl left-5 mt-5 top-5 z-50 px-3 cursor-pointer py-2 text-white dark:bg-gray-700 bg-purple-500 shadow-md shadow-purple-800 dark:text-white rounded"
    >
      {isDark ? (
        <i className="fa-solid fa-sun"></i> 
      ) : (
        <i className="fa-solid fa-moon"></i> 
      )}
    </button>
  );
}
