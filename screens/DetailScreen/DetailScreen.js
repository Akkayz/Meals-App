// screens/DetailScreen/DetailScreen.js
import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, FlatList } from "react-native";
import useDatabase from "../../components/db"; // Đảm bảo đường dẫn đúng

const DetailScreen = ({ route }) => {
  const { categoryId } = route.params; // Lấy categoryId từ route params
  const [meals, setMeals] = useState([]);
  const { db } = useDatabase(); // Sử dụng hook để truy xuất cơ sở dữ liệu

  useEffect(() => {
    if (!db) return;

    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM meals WHERE category_id = ?",
        [categoryId],
        (_, { rows: { _array } }) => {
          setMeals(_array);
        },
        (tx, error) => {
          console.error("Error fetching meals: ", error);
        }
      );
    });
  }, [db, categoryId]);

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.title}>{item.name}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={meals}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
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
});

export default DetailScreen;
