import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { TodoType } from "@/app/(tabs)/todo";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Inter_500Medium, useFonts } from "@expo-google-fonts/inter";

export default function TodoList({
  todo,
  updateTodo,
  removeTodo,
}: {
  todo: TodoType;
  updateTodo: (todo: number) => void;
  removeTodo: (todo: number) => void;
}) {
  const [loaded, error] = useFonts({
    Inter_500Medium,
  });

  if (!loaded && !error) return null;
  return (
    <View style={styles.todoItem}>
      <Text
        style={[styles.todoText, todo.completed && styles.completedText]}
        onPress={() => updateTodo(todo.id)}
      >
        {todo.title}
      </Text>
      <Pressable onPress={() => removeTodo(todo.id)}>
        <MaterialIcons name="delete" size={24} color="red" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  todoItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
    padding: 10,
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    width: "100%",
    maxWidth: 1024,
    marginHorizontal: "auto",
    pointerEvents: "auto",
  },
  todoText: {
    fontSize: 18,
    fontFamily: "Inter_500Medium",
  },
  completedText: {
    textDecorationLine: "line-through",
    color: "gray",
  },
});
