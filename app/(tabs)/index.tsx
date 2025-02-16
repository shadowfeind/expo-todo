import { StyleSheet, View } from "react-native";

export default function Index() {
  return (
    <View style={styles.main}>
      <h1>Kiran</h1>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: "center",
    alignSelf: "center",
  },
});
