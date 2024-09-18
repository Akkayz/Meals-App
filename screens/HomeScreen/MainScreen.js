import React from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  useColorScheme, // Import useColorScheme để phát hiện chế độ sáng/tối
} from "react-native";
import useDatabase from "../../components/db";
import { categoryImages } from "../../components/imageAssets";

const MainScreen = ({ navigation }) => {
  const { categories } = useDatabase();
  const colorScheme = useColorScheme(); // Xác định chế độ sáng/tối

  const handlePress = (category) => {
    navigation.navigate("DetailScreen", {
      categoryId: category.id,
      categoryTitle: category.title,
    });
  };

  const renderItem = ({ item }) => {
    const imageKey = item.image.replace(/\.[^/.]+$/, "");
    const image = categoryImages[imageKey];

    return (
      <TouchableOpacity
        style={[
          styles.itemContainer,
          { backgroundColor: colorScheme === "dark" ? "#333" : "#f5f5f5" },
        ]}
        onPress={() => handlePress(item)}
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
      </TouchableOpacity>
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
        data={categories}
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
  row: {
    justifyContent: "space-between",
  },
});

export default MainScreen;
