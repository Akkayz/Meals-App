import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { getCategories } from "../../components/db";

const MainScreen = ({ navigation }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories((result) => {
      console.log("Categories data:", result);
      setCategories(result);
    });
  }, []);

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      style={styles.gridItem}
      onPress={() => navigation.navigate("MealDetail", { categoryId: item.id })}
    >
      <View style={styles.categoryContainer}>
        <Image source={{ uri: item.image }} style={styles.categoryImage} />
        <Text style={styles.categoryTitle}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={categories}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderCategoryItem}
      numColumns={2}
    />
  );
};

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 10,
    height: 150,
  },
  categoryContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#f5f5f5",
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 3,
  },
  categoryImage: {
    width: "100%",
    height: "70%",
    borderRadius: 10,
  },
  categoryTitle: {
    fontSize: 18,
    marginVertical: 5,
    textAlign: "center",
  },
});

export default MainScreen;
