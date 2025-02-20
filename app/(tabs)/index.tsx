import { StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <View style={styles.main}>
      <Text>kiran</Text>
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
