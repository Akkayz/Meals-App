import React, { useContext } from "react";
import { View, Text, StyleSheet, Switch } from "react-native";
import { ThemeContext } from "../../components/ThemeContext"; // Đường dẫn đúng

const SettingsScreen = () => {
  const { theme, toggleTheme } = useContext(ThemeContext); // Lấy trạng thái theme và toggleTheme từ context

  const isDarkMode = theme === "dark"; // Kiểm tra theme hiện tại

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? "#333" : "#fff" },
      ]}
    >
      <Text style={[styles.title, { color: isDarkMode ? "#fff" : "#000" }]}>
        Cài đặt
      </Text>
      <View style={styles.row}>
        <Text style={[styles.text, { color: isDarkMode ? "#fff" : "#000" }]}>
          Chế độ Dark/Light Mode
        </Text>
        <Switch
          value={isDarkMode}
          onValueChange={toggleTheme} // Chuyển đổi theme khi bật/tắt
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  text: {
    fontSize: 18,
  },
});

export default SettingsScreen;
