// App.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MainScreen from "./screens/HomeScreen/MainScreen";
import DetailScreen from "./screens/DetailScreen/DetailScreen"; // Import màn hình chi tiết

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="MainScreen"
          component={MainScreen}
          options={{ title: "Danh Mục Món Ăn" }}
        />
        <Stack.Screen
          name="DetailScreen"
          component={DetailScreen}
          options={{ title: "Chi Tiết Món Ăn" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
