import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import TodoList from "@/components/todo/TodoList";

export type TodoType = {
  id: number;
  title: string;
  completed: boolean;
};
export default function Index() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState<TodoType[]>([]);

  const addTodo = () => {
    setTodos((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        title: todo,
        completed: false,
      },
    ]);
    setTodo("");
  };

  const removeTodo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };
  const updateTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a new todo"
          placeholderTextColor={"gray"}
          value={todo}
          onChangeText={setTodo}
        />
        <Pressable onPress={addTodo} style={styles.addButton}>
          <Text style={styles.addButtonText}>Add</Text>
        </Pressable>
      </View>
      <FlatList
        data={todos}
        renderItem={({ item }) => (
          <TodoList
            todo={item}
            updateTodo={updateTodo}
            removeTodo={removeTodo}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{
          flexGrow: 1,
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "white",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    padding: 10,
    width: "100%",
    maxWidth: 1024,
    marginHorizontal: "auto",
    pointerEvents: "auto",
  },
  input: {
    flex: 1,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    minWidth: 0,
    marginRight: 12,
  },
  addButton: {
    backgroundColor: "black",
    padding: 10,
    borderRadius: 5,
  },
  addButtonText: {
    fontSize: 16,
    color: "white",
  },
});
