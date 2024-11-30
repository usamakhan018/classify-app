import { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Button, List, Text, TextInput, } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';

import * as SQLite from 'expo-sqlite';
import * as Notifications from 'expo-notifications';

export default function Home() {
  const [deadline, setDeadline] = useState(new Date());
  const [title, setTitle] = useState('');
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false)

  const onChange = (event: React.FormEvent, selectedDate: Date) => {
    setShow(false);
    setDeadline(selectedDate);
  };

  const showDateTime = () => {
    setShow(true);
  };

  useEffect(() => {
    (async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        alert('Notification permissions not granted!');
      }
    })();

    createDatabase()
    getTodos()
  }, [])

  async function scheduleNotifications(todos) {
    for (const todo of todos) {
      const deadline = new Date(todo.deadline);
      if (deadline > new Date()) { // Schedule only for future deadlines
        await Notifications.scheduleNotificationAsync({
          content: {
            title: 'Todo Reminder',
            body: `Reminder: ${todo.title}`,
          },
          trigger: deadline,
        });
      }
    }
  }

  async function createDatabase() {
    const db = await SQLite.openDatabaseAsync('db');

    await db.execAsync(`
      PRAGMA journal_mode = WAL;
      CREATE TABLE IF NOT EXISTS todos (
        id INTEGER PRIMARY KEY NOT NULL, 
        title TEXT NOT NULL,
        deadline TEXT NOT NULL
      );
      `);
    console.log("database created.")
  }

  async function getTodos() {
    const db = await SQLite.openDatabaseAsync('db');
    const todos = await db.getAllAsync("SELECT * FROM todos;")
    setData(todos)
    scheduleNotifications(todos);
  }

  async function deleteTodo(id: number) {
    const db = await SQLite.openDatabaseAsync('db');
    await db.runAsync('DELETE FROM todos WHERE id = ?', id);
    getTodos()
  }

  async function createTodo() {
    const db = await SQLite.openDatabaseAsync('db');
    const formattedDeadline = deadline.toISOString();
    await db.runAsync('INSERT INTO todos (title, deadline) VALUES (?,?)', title, formattedDeadline);
    getTodos()
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 16 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>
        Welcome to Classify
      </Text>
      <TextInput
        label="Todo"
        value={title}
        onChangeText={title => setTitle(title)}
        mode="outlined"
        style={{ marginBottom: 20 }}
      />
      <View style={{ display: "flex", justifyContent: "space-between", direction: "row" }}>
        <Text style={{ marginBottom: 20 }}>{deadline.toLocaleString()}</Text>
        <Button
          mode="contained"
          onPress={showDateTime}
          style={{ marginBottom: 20 }}
        >
          Pick Time
        </Button>
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={deadline}
          mode={"time"}
          is24Hour={false}
          onChange={onChange}
        />
      )}
      <Button
        mode="contained"
        onPress={createTodo}
        style={{ marginBottom: 20 }}
      >
        Submit
      </Button>

      <ScrollView style={{ flex: 1 }}>
        <List.Section>
          {data.map(item => (
            <List.Item
              key={item.id}
              title={`${new Date(item.deadline).toLocaleTimeString()} | ${item.title}`}
              right={() => (
                <Button mode="outline" onPress={() => deleteTodo(item.id)}>
                  Delete
                </Button>
              )}
            />
          ))}
        </List.Section>
      </ScrollView>
    </View>
  );
}


