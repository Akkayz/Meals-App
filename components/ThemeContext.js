// ThemeContext.js
import React, { createContext, useState } from "react";
import { Appearance } from "react-native";
import { DefaultTheme, DarkTheme } from "@react-navigation/native";

export const ThemeContext = createContext();

const customDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: "#1a73e8", // Ví dụ màu chính trong chế độ tối
    background: "#343A40",
    card: "#495057",
    text: "#F8F9FA",
    border: "#6c757d",
  },
};

const customLightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#1a73e8", // Ví dụ màu chính trong chế độ sáng
    background: "#F8F9FA",
    card: "#FFFFFF",
    text: "#212529",
    border: "#ced4da",
  },
};

export const ThemeProvider = ({ children }) => {
  const systemTheme = Appearance.getColorScheme(); // Lấy theme mặc định theo hệ thống (dark hoặc light)
  const [theme, setTheme] = useState(systemTheme || "light"); // Mặc định là light nếu không có
  const [headerShown, setHeaderShown] = useState(true); // Thêm trạng thái để quản lý headerShown

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const toggleHeaderShown = () => {
    setHeaderShown((prev) => !prev);
  };

  const themeConfig = theme === "dark" ? customDarkTheme : customLightTheme;

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
        themeConfig,
        headerShown,
        toggleHeaderShown,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
