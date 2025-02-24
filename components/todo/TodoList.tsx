import {
  ColorSchemeName,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useContext } from "react";
import { TodoType } from "@/app/(tabs)/todo";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Inter_500Medium, useFonts } from "@expo-google-fonts/inter";
import { ThemeContext } from "@/context/ThemeContext";
import { useRouter } from "expo-router";

export default function TodoList({
  todo,
  updateTodo,
  removeTodo,
}: {
  todo: TodoType;
  updateTodo: (todo: number) => void;
  removeTodo: (todo: number) => void;
}) {
  const router = useRouter();
  const { theme, colorScheme } = useContext(ThemeContext);
  const styles = createStyles(theme, colorScheme);
  const [loaded, error] = useFonts({
    Inter_500Medium,
  });

  if (!loaded && !error) return null;

  const handlePress = (id: number) => {
    router.push(`/todo/${id}`);
  };

  return (
    <View style={styles.todoItem}>
      <Pressable
        onPress={() => handlePress(todo.id)}
        onLongPress={() => updateTodo(todo.id)}
      >
        <Text style={[styles.todoText, todo.completed && styles.completedText]}>
          {todo.title}
        </Text>
      </Pressable>
      <Pressable onPress={() => removeTodo(todo.id)}>
        <MaterialIcons name="delete" size={24} color="red" />
      </Pressable>
    </View>
  );
}

function createStyles(theme: any, colorScheme: ColorSchemeName) {
  return StyleSheet.create({
    todoItem: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 4,
      padding: 10,
      borderBottomColor: "gray",
      borderBottomWidth: 1,
      width: "100%",
      maxWidth: 1024,
      marginHorizontal: "auto",
      pointerEvents: "auto",
    },
    todoText: {
      flex: 1,
      fontSize: 18,
      fontFamily: "Inter_500Medium",
      color: theme.text,
    },
    completedText: {
      textDecorationLine: "line-through",
      color: "gray",
    },
  });
}
