import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import useDatabase from "../../components/db"; // Đảm bảo đường dẫn đúng với vị trí của db.js

const DetailScreen = ({ route }) => {
  const { categoryId } = route.params;
  const { getMealsByCategory } = useDatabase();
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const fetchedMeals = await getMealsByCategory(categoryId);
        setMeals(fetchedMeals);
      } catch (error) {
        console.error("Error fetching meals: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMeals();
  }, [categoryId, getMealsByCategory]);

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

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
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  itemContainer: {
    marginBottom: 10,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#f5f5f5",
    elevation: 3,
    padding: 10,
  },
  image: {
    width: "100%",
    height: 150,
  },
  title: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default DetailScreen;
