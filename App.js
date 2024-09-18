import React, { useContext } from "react";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MainScreen from "./screens/HomeScreen/MainScreen";
import DetailScreen from "./screens/DetailScreen/DetailScreen";
import FavoritesScreen from "./screens/FavoritesScreen/FavoritesScreen";
import SettingsScreen from "./screens/SettingsScreen/SettingsScreen";
import { Ionicons } from "@expo/vector-icons"; // Thư viện để thêm icon vào Tab
import { ThemeContext, ThemeProvider } from "./components/ThemeContext"; // Import ThemeContext

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

// Stack Navigator cho "Danh mục"
const MainStack = () => (
  <Stack.Navigator
    initialRouteName="MainScreen"
    screenOptions={{
      headerShown: true,
    }}
  >
    <Stack.Screen name="MainScreen" component={MainScreen} />
    <Stack.Screen name="DetailScreen" component={DetailScreen} />
  </Stack.Navigator>
);

// Bottom Tab Navigator
const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Categories"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "Categories") {
            iconName = "list-outline"; // Icon cho "Danh mục"
          } else if (route.name === "Favorites") {
            iconName = "heart-outline"; // Icon cho "Yêu thích"
          } else if (route.name === "Settings") {
            iconName = "settings-outline"; // Icon cho "Cài đặt"
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "tomato", // Màu khi tab đang được chọn
        tabBarInactiveTintColor: "gray", // Màu khi tab không được chọn
      })}
    >
      <Tab.Screen
        name="Categories"
        component={MainStack} // Liên kết đến Stack Navigator của "Danh mục"
        options={{ title: "Danh mục" }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen} // Liên kết đến màn hình "Yêu thích"
        options={{ title: "Yêu thích" }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen} // Liên kết đến màn hình "Cài đặt"
        options={{ title: "Cài đặt" }}
      />
    </Tab.Navigator>
  );
};

// Drawer Navigator
const App = () => {
  const { theme } = useContext(ThemeContext); // Lấy theme từ ThemeContext

  return (
    <NavigationContainer theme={theme === "dark" ? DarkTheme : DefaultTheme}>
      <Drawer.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: true,
        }}
      >
        <Drawer.Screen name="Home" component={BottomTabNavigator} />
        <Drawer.Screen name="Favorites" component={FavoritesScreen} />
        <Drawer.Screen name="Settings" component={SettingsScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default () => (
  <ThemeProvider>
    <App />
  </ThemeProvider>
);
