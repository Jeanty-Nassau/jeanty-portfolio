"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

function getPreferredTheme(): Theme {
  if (typeof window === "undefined") {
    return "light";
  }

  const stored = window.localStorage.getItem("portfolio-theme");

  if (stored === "light" || stored === "dark") {
    return stored;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const preferred = getPreferredTheme();
    setTheme(preferred);
    applyTheme(preferred);
  }, []);

  function toggleTheme() {
    const nextTheme = theme === "dark" ? "light" : "dark";

    setTheme(nextTheme);
    applyTheme(nextTheme);
    window.localStorage.setItem("portfolio-theme", nextTheme);
  }

  const nextLabel = theme === "dark" ? "Light" : "Dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="group inline-flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] transition-colors hover:text-orange"
      aria-label={`Switch to ${nextLabel.toLowerCase()} mode`}
      title={`Switch to ${nextLabel.toLowerCase()} mode`}
    >
      <span
        className={[
          "h-2 w-2 rounded-full border transition-all",
          theme === "dark"
            ? "border-orange bg-orange"
            : "border-current bg-transparent group-hover:border-orange",
        ].join(" ")}
        aria-hidden="true"
      />
      {nextLabel}
    </button>
  );
}
