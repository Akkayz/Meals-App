import * as FileSystem from "expo-file-system";
import * as SQLite from "expo-sqlite/legacy";
import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, Dimensions } from "react-native";
import { Asset } from "expo-asset";

const db = SQLite.openDatabase("mealsApp.db");

export default function App() {
  const [categories, setCategories] = useState([]);
  const [dbExists, setDbExists] = useState(false);

  useEffect(() => {
    const copyDatabase = async () => {
      const dbUri = `${FileSystem.documentDirectory}SQLite/mealsApp.db`;

      // Sao chép tệp cơ sở dữ liệu từ thư mục assets vào thư mục tài liệu của ứng dụng
      await FileSystem.makeDirectoryAsync(
        `${FileSystem.documentDirectory}SQLite`,
        { intermediates: true }
      );
      const asset = Asset.fromModule(require("./assets/mealsApp.db"));
      await FileSystem.downloadAsync(asset.uri, dbUri);

      setDbExists(true);
    };

    copyDatabase();
  }, []);

  useEffect(() => {
    if (!dbExists) return;

    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM categories",
        [],
        (_, { rows: { _array } }) => {
          setCategories(_array);
        },
        (tx, error) => {
          console.error("Error fetching categories: ", error);
        }
      );
    });
  }, [dbExists]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Danh sách categories TO:</Text>
      {dbExists ? (
        categories.length > 0 ? (
          <FlatList
            data={categories}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <Text style={styles.itemText}>{item.title}</Text>
              </View>
            )}
            numColumns={1} // Hiển thị mỗi mục trên một hàng riêng biệt
          />
        ) : (
          <Text style={styles.message}>Không có categories nào.</Text>
        )
      ) : (
        <Text style={styles.message}>Đang kiểm tra cơ sở dữ liệu...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  item: {
    flex: 1,
    padding: 16,
    margin: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    alignItems: "center", // Căn giữa nội dung theo chiều ngang
    justifyContent: "center", // Căn giữa nội dung theo chiều dọc
    height: Dimensions.get("window").width / 2 - 32, // Chiều cao của mỗi mục
  },
  itemText: {
    fontSize: 30, // Tăng kích thước chữ của các mục trong danh sách lên 30
  },
  message: {
    fontSize: 18,
  },
});
