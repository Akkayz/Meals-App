import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { mealImages } from "../../components/imageAssets"; // Import hình ảnh món ăn

const FavoritesScreen = () => {
  const [favoriteMeals, setFavoriteMeals] = useState([]);

  // Lấy danh sách món ăn yêu thích từ AsyncStorage
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

  // Hàm xóa món ăn khỏi danh sách yêu thích
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
      <View style={styles.itemContainer}>
        <Image source={image} style={styles.image} resizeMode="cover" />
        <Text style={styles.title}>{item.title}</Text>
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
    <View style={styles.container}>
      <FlatList
        data={favoriteMeals}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        ListEmptyComponent={<Text>Không có món ăn yêu thích nào.</Text>}
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
    backgroundColor: "#f5f5f5",
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
    backgroundColor: "red",
    padding: 10,
    marginTop: 5,
    borderRadius: 5,
  },
  removeButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  row: {
    justifyContent: "space-between",
  },
});

export default FavoritesScreen;
