export default function ThemeToggle() {
  const toggleTheme = () => {
    const html = document.documentElement;

    if (html.classList.contains("dark")) {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="px-3 py-2 bg-gray-200 dark:bg-gray-700 dark:text-white rounded"
    >
      Toggle Theme
    </button>
  );
}
