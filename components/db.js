import * as SQLite from "expo-sqlite/legacy";

const db = SQLite.openDatabase({ name: "mealsApp.db", location: "default" });

export const getCategories = (callback) => {
  db.transaction((tx) => {
    tx.executeSql(
      "SELECT * FROM categories",
      [],
      (txObj, resultSet) => {
        console.log(resultSet.rows._array); // Để kiểm tra dữ liệu trả về
        if (callback) {
          callback(resultSet.rows._array);
        }
      },
      (txObj, error) => {
        console.log("Error: ", error);
      }
    );
  });
};

// Gọi hàm getCategories để kiểm tra
getCategories((data) => {
  console.log("Data from getCategories:", data);
});
