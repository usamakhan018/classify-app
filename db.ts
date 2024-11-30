


import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseAsync('myDatabase.db');

export const createTable = async () => {
  (await db).execAsync(`CREATE TABLE IF NOT EXISTS todos (id INTEGER PRIMARY KEY NOT NULL, todo TEXT NOT NULL);`);
};

export const selectTodos = async () => {
  const res = (await db).execAsync(`SELECT * FROM todos);`)
  console.log(res)


};

export const insertTodo = async (text: string) => {
  (await db).execAsync(`INSERT INTO todos (todo) VALUES ('${text}');`);
};
