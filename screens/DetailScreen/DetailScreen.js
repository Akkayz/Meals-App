import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  Dimensions,
} from "react-native";
import useDatabase from "../../components/db";
import { mealImages } from "../../components/imageAssets";

const DetailScreen = ({ route, navigation }) => {
  const { categoryId, categoryTitle } = route.params; // Lấy cả ID và tên danh mục từ params
  const [meals, setMeals] = useState([]);
  const { getMealsByCategory } = useDatabase();

  useEffect(() => {
    // Đặt tiêu đề động cho màn hình chi tiết dựa trên tên danh mục
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

    fetchMeals();
  }, [categoryId, getMealsByCategory]);

  const renderItem = ({ item }) => {
    const imageKey = item.image.replace(/\.[^/.]+$/, "");
    const image = mealImages[imageKey] || mealImages["default-image"];

    return (
      <View style={styles.itemContainer}>
        <Image source={image} style={styles.image} resizeMode="cover" />
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
  row: {
    justifyContent: "space-between",
  },
});

export default DetailScreen;
