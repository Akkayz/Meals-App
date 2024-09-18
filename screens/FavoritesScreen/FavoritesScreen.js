import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
  useColorScheme, // Import useColorScheme để phát hiện chế độ sáng/tối
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { mealImages } from "../../components/imageAssets";

const FavoritesScreen = () => {
  const [favoriteMeals, setFavoriteMeals] = useState([]);
  const colorScheme = useColorScheme(); // Xác định chế độ sáng/tối

  const fetchFavoriteMeals = async () => {
    try {
      const favorites = await AsyncStorage.getItem("favorites");
      setFavoriteMeals(favorites ? JSON.parse(favorites) : []);
    } catch (error) {
      console.error("Error fetching favorite meals: ", error);
    }
  };

  useEffect(() => {
    fetchFavoriteMeals();
  }, []);

  const removeFavoriteMeal = async (mealId) => {
    try {
      const updatedFavorites = favoriteMeals.filter(
        (meal) => meal.id !== mealId
      );
      await AsyncStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      setFavoriteMeals(updatedFavorites);
      Alert.alert("Thông báo", "Đã xóa món ăn khỏi yêu thích.");
    } catch (error) {
      console.error("Error removing favorite meal: ", error);
    }
  };

  const renderItem = ({ item }) => {
    const imageKey = item.image.replace(/\.[^/.]+$/, "");
    const image = mealImages[imageKey] || mealImages["default-image"];

    return (
      <View
        style={[
          styles.itemContainer,
          { backgroundColor: colorScheme === "dark" ? "#333" : "#f5f5f5" },
        ]}
      >
        <Image source={image} style={styles.image} resizeMode="cover" />
        <Text
          style={[
            styles.title,
            { color: colorScheme === "dark" ? "#fff" : "#000" },
          ]}
        >
          {item.title}
        </Text>
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => removeFavoriteMeal(item.id)}
        >
          <Text style={styles.removeButtonText}>Xóa</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colorScheme === "dark" ? "#000" : "#fff" },
      ]}
    >
      <FlatList
        data={favoriteMeals}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  itemContainer: {
    flex: 1,
    margin: 5,
    borderRadius: 8,
    overflow: "hidden",
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 150,
  },
  title: {
    padding: 10,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  removeButton: {
    backgroundColor: "tomato",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    margin: 10,
  },
  removeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  row: {
    justifyContent: "space-between",
  },
});

export default FavoritesScreen;
