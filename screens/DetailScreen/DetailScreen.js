import React, { useEffect, useState } from "react";
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
import useDatabase from "../../components/db";
import { mealImages } from "../../components/imageAssets";
import Icon from "react-native-vector-icons/Ionicons"; // Import icon

const DetailScreen = ({ route, navigation }) => {
  const { categoryId, categoryTitle } = route.params; // Lấy ID và tên danh mục từ params
  const [meals, setMeals] = useState([]);
  const [favoriteMeals, setFavoriteMeals] = useState([]);
  const { getMealsByCategory } = useDatabase();

  useEffect(() => {
    navigation.setOptions({ title: categoryTitle });
  }, [navigation, categoryTitle]);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const mealsData = await getMealsByCategory(categoryId);
        setMeals(mealsData);
      } catch (error) {
        console.error("Error fetching meals: ", error);
      }
    };

    const fetchFavoriteMeals = async () => {
      try {
        const favorites = await AsyncStorage.getItem("favorites");
        setFavoriteMeals(favorites ? JSON.parse(favorites) : []);
      } catch (error) {
        console.error("Error fetching favorite meals: ", error);
      }
    };

    fetchMeals();
    fetchFavoriteMeals();
  }, [categoryId, getMealsByCategory]);

  // Kiểm tra xem món ăn có trong danh sách yêu thích không
  const isFavorite = (mealId) => {
    return favoriteMeals.some((favMeal) => favMeal.id === mealId);
  };

  // Hàm xử lý thêm hoặc xóa món ăn yêu thích
  const toggleFavoriteMeal = async (meal) => {
    try {
      let updatedFavorites = [];
      if (isFavorite(meal.id)) {
        // Xóa món ăn khỏi yêu thích nếu đã tồn tại
        updatedFavorites = favoriteMeals.filter(
          (favMeal) => favMeal.id !== meal.id
        );
        Alert.alert("Thông báo", "Đã xóa khỏi yêu thích.");
      } else {
        // Thêm món ăn vào yêu thích
        updatedFavorites = [...favoriteMeals, meal];
        Alert.alert("Thông báo", "Đã thêm vào yêu thích.");
      }
      setFavoriteMeals(updatedFavorites);
      await AsyncStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    } catch (error) {
      console.error("Error toggling favorite meal: ", error);
    }
  };

  const renderItem = ({ item }) => {
    const imageKey = item.image.replace(/\.[^/.]+$/, "");
    const image = mealImages[imageKey] || mealImages["default-image"];

    return (
      <View style={styles.itemContainer}>
        <Image source={image} style={styles.image} resizeMode="cover" />
        <TouchableOpacity
          style={styles.heartIcon}
          onPress={() => toggleFavoriteMeal(item)}
        >
          <Icon
            name={isFavorite(item.id) ? "heart" : "heart-outline"} // Biểu tượng trái tim đầy hoặc viền
            size={30}
            color="tomato"
          />
        </TouchableOpacity>
        <Text style={styles.title}>{item.title}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={meals}
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
  heartIcon: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1,
  },
  row: {
    justifyContent: "space-between",
  },
});

export default DetailScreen;
