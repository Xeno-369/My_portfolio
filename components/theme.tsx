"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type Mode = "night" | "day";

const ThemeContext = createContext<{
  mode: Mode;
  toggle: () => void;
}>({ mode: "night", toggle: () => {} });

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<Mode>("night");

  useEffect(() => {
    document.documentElement.dataset.mode = mode;
  }, [mode]);

  return (
    <ThemeContext.Provider
      value={{
        mode,
        toggle: () => setMode((m) => (m === "night" ? "day" : "night")),
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
