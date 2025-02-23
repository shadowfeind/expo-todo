import {
  ColorSchemeName,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Inter_500Medium, useFonts } from "@expo-google-fonts/inter";
import Octicons from "@expo/vector-icons/Octicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemeContext } from "@/context/ThemeContext";
import { TodoType } from ".";
import { StatusBar } from "expo-status-bar";

export default function EditScreen() {
  const { id } = useLocalSearchParams();
  const [todo, setTodo] = useState<TodoType>({
    id: 0,
    title: "",
    completed: false,
  });
  const router = useRouter();
  const [loaded, error] = useFonts({
    Inter_500Medium,
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("todos");
        if (jsonValue !== null) {
          const todos = JSON.parse(jsonValue);
          const todo = todos.find(
            (todo: TodoType) => todo.id.toString() === id
          );
          setTodo(todo);
        } else {
          console.log("No todos found");
          router.push("/(tabs)/todo");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);
  const { theme, colorScheme, setColorScheme } = useContext(ThemeContext);
  if (!loaded && !error) return null;

  const styles = createStyles(theme, colorScheme);

  const handleSave = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("todos");
      if (jsonValue !== null) {
        const todos = JSON.parse(jsonValue);
        const index = todos.findIndex(
          (todo: TodoType) => todo.id.toString() === id
        );
        todos[index] = { ...todos[index], title: todo };
        await AsyncStorage.setItem("todos", JSON.stringify(todos));
        router.push("/(tabs)/todo");
      } else {
        console.log("No todos found");
        router.push("/(tabs)/todo");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="edit todo"
          placeholderTextColor="gray"
          value={todo?.title || ""}
          onChangeText={(text) => setTodo((prev) => ({ ...prev, title: text }))}
        />
        <Pressable
          onPress={() =>
            setColorScheme(colorScheme === "light" ? "dark" : "light")
          }
          style={{ marginLeft: 10 }}
        >
          {colorScheme === "dark" ? (
            <Octicons
              name="moon"
              size={36}
              color={theme.text}
              selectable={undefined}
            />
          ) : (
            <Octicons
              name="sun"
              size={36}
              color={theme.text}
              selectable={undefined}
            />
          )}
        </Pressable>
      </View>
      <View style={styles.inputContainer}>
        <Pressable onPress={handleSave} style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save</Text>
        </Pressable>
        <Pressable
          onPress={() => router.push("/(tabs)/todo")}
          style={[styles.saveButton, { backgroundColor: "red" }]}
        >
          <Text style={[styles.saveButtonText, { color: "#fff" }]}>Cancel</Text>
        </Pressable>
      </View>
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
    </SafeAreaView>
  );
}

function createStyles(theme: any, colorScheme: ColorSchemeName) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
      padding: 20,
    },
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 20,
    },
    input: {
      flex: 1,
      height: 40,
      borderColor: theme.text,
      borderWidth: 1,
      borderRadius: 5,
      paddingHorizontal: 10,
      color: theme.text,
    },
    saveButton: {
      backgroundColor: theme.text,
      padding: 10,
      borderRadius: 5,
    },
    saveButtonText: {
      color: theme.background,
      fontWeight: "bold",
    },
  });
}
