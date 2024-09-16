import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  Dimensions,
} from "react-native";
import useDatabase from "../../components/db"; // Đảm bảo đường dẫn đúng với vị trí của db.js
import { mealImages } from "../../components/imageAssets"; // Import đối tượng mapping

const DetailScreen = ({ route }) => {
  const { categoryId } = route.params; // Lấy ID danh mục từ params
  const [meals, setMeals] = useState([]);
  const { getMealsByCategory } = useDatabase(); // Lấy dữ liệu món ăn từ db.js

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
    // Loại bỏ phần mở rộng tệp từ item.image
    const imageKey = item.image.replace(/\.[^/.]+$/, "");
    // Lấy ảnh từ mealImages hoặc sử dụng ảnh mặc định nếu không tìm thấy
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
        numColumns={2} // Hiển thị 2 cột
        columnWrapperStyle={styles.row} // Thêm style cho các hàng
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
    height: 150, // Tăng chiều cao để ảnh rõ hơn
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
