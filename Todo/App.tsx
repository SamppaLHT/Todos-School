import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, SafeAreaView, Text } from 'react-native';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';
import { useTodos } from './hooks/useTodos';

export default function App() {
  const { todos, addTodo, toggleTodo } = useTodos();

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
