import React from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import useDatabase from "../../components/db"; // Đảm bảo đường dẫn đúng với vị trí của db.js
import { categoryImages } from "../../components/imageAssets"; // Import đối tượng mapping

const MainScreen = ({ navigation }) => {
  const { categories } = useDatabase(); // Lấy danh sách các danh mục từ db.js

  // Hàm xử lý khi nhấn vào một danh mục
  const handlePress = (category) => {
    navigation.navigate("DetailScreen", { categoryId: category.id }); // Chuyển tới màn hình chi tiết
  };

  // Render một mục danh mục
  const renderItem = ({ item }) => {
    // Loại bỏ phần mở rộng tệp từ item.image
    const imageKey = item.image.replace(/\.[^/.]+$/, "");
    const image = categoryImages[imageKey];

    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => handlePress(item)}
      >
        <Image source={image} style={styles.image} resizeMode="cover" />
        <Text style={styles.title}>{item.title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
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

export default MainScreen;
