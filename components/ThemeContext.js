// ThemeContext.js
import React, { createContext, useState } from "react";
import { Appearance } from "react-native";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const systemTheme = Appearance.getColorScheme(); // Lấy theme mặc định theo hệ thống (dark hoặc light)
  const [theme, setTheme] = useState(systemTheme || "light"); // Mặc định là light nếu không có

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
