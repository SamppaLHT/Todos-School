import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, SafeAreaView, Text } from 'react-native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';
import { Todo } from './types/Todo';

const STORAGE_KEY = '@todos';

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  // Load todos from AsyncStorage on app start
  useEffect(() => {
    loadTodos();
  }, []);

  // Save todos to AsyncStorage whenever they change
  useEffect(() => {
    saveTodos();
  }, [todos]);

  const loadTodos = async () => {
    try {
      const todosJson = await AsyncStorage.getItem(STORAGE_KEY);
      if (todosJson !== null) {
        setTodos(JSON.parse(todosJson));
      }
    } catch (error) {
      console.error('Error loading todos:', error);
    }
  };

  const saveTodos = async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    } catch (error) {
      console.error('Error saving todos:', error);
    }
  };

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      text,
      completed: false,
    };
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Todo List</Text>
      </View>
      <View style={styles.header}>
        <AddTodo onAddTodo={addTodo} />
      </View>
      <TodoList todos={todos} onToggleTodo={toggleTodo} />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    marginTop: 40,
  },
  titleContainer: {
    backgroundColor: '#ffffffff',
    padding: 15,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  header: {
    backgroundColor: '#fff',
    borderBottomWidth: 1
  },
});
