import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function ABoutScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>About screen</Text>
      <Link style={styles.button} href={"/"}>
        Go To Home
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#fff",
  },
  button: {
    fontSize: 14,
    backgroundColor: "#fff",
    padding: 4,
    borderRadius: 8,
  },
});
