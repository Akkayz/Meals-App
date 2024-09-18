// App.js
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
import { Ionicons } from "@expo/vector-icons";
import { ThemeContext, ThemeProvider } from "./components/ThemeContext";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const MainStack = () => {
  const { themeConfig } = useContext(ThemeContext);

  return (
    <Stack.Navigator
      initialRouteName="MainScreen"
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: themeConfig.colors.card,
          borderBottomWidth: 1,
          borderBottomColor: themeConfig.colors.border,
          shadowColor: "transparent",
          elevation: 0,
        },
        headerTintColor: themeConfig.colors.text,
        headerTitleStyle: {
          fontSize: 18,
          fontWeight: "bold",
          textAlign: "center",
        },
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen
        name="MainScreen"
        component={MainScreen}
        options={{ title: "Thực đơn món ăn" }}
      />
      <Stack.Screen
        name="DetailScreen"
        component={DetailScreen}
        options={{ title: "Chi tiết món ăn" }}
      />
    </Stack.Navigator>
  );
};

const BottomTabNavigator = () => {
  const { themeConfig } = useContext(ThemeContext);

  return (
    <Tab.Navigator
      initialRouteName="Categories"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "Categories") {
            iconName = "list-outline";
          } else if (route.name === "Favorites") {
            iconName = "heart-outline";
          } else if (route.name === "Settings") {
            iconName = "settings-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: themeConfig.colors.primary,
        tabBarInactiveTintColor: themeConfig.colors.text,
        tabBarStyle: {
          backgroundColor: themeConfig.colors.card,
        },
      })}
    >
      <Tab.Screen
        name="Categories"
        component={MainStack}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{ title: "Yêu thích" }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ title: "Cài đặt" }}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  const { theme, themeConfig, headerShown } = useContext(ThemeContext);

  return (
    <NavigationContainer theme={theme === "dark" ? DarkTheme : DefaultTheme}>
      <Drawer.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: headerShown, // Use headerShown from ThemeContext
          drawerStyle: {
            backgroundColor: themeConfig.colors.background,
          },
          drawerContentOptions: {
            activeTintColor: themeConfig.colors.primary,
            inactiveTintColor: themeConfig.colors.text,
          },
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
