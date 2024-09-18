import { useState, useEffect } from "react";
import * as FileSystem from "expo-file-system";
import { Asset } from "expo-asset";
import * as SQLite from "expo-sqlite/legacy"; // Sử dụng thư viện expo-sqlite/legacy

const useDatabase = () => {
  const [db, setDb] = useState(null);
  const [categories, setCategories] = useState([]);
  const [meals, setMeals] = useState([]);
  const [dbExists, setDbExists] = useState(false);

  useEffect(() => {
    const copyDatabase = async () => {
      const dbUri = `${FileSystem.documentDirectory}SQLite/mealsApp.db`;

      // Kiểm tra xem cơ sở dữ liệu đã tồn tại chưa
      const dbFile = await FileSystem.getInfoAsync(dbUri);
      if (!dbFile.exists) {
        // Sao chép tệp cơ sở dữ liệu từ thư mục assets vào thư mục tài liệu của ứng dụng
        await FileSystem.makeDirectoryAsync(
          `${FileSystem.documentDirectory}SQLite`,
          { intermediates: true }
        );
        const asset = Asset.fromModule(require("../assets/mealsApp.db"));
        await FileSystem.downloadAsync(asset.uri, dbUri);
      }

      // Mở cơ sở dữ liệu
      const database = SQLite.openDatabase("mealsApp.db");
      setDb(database);
      setDbExists(true);
    };

    copyDatabase();
  }, []);

  useEffect(() => {
    if (!dbExists || !db) return;

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
  }, [dbExists, db]);

  const getMealsByCategory = (categoryId) => {
    return new Promise((resolve, reject) => {
      if (!dbExists || !db) return;

      db.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM meals WHERE categoryId = ?",
          [categoryId],
          (_, { rows: { _array } }) => {
            resolve(_array);
          },
          (tx, error) => {
            reject(error);
          }
        );
      });
    });
  };

  return { categories, getMealsByCategory };
};

export default useDatabase;
