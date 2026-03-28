import { Text, View, StyleSheet } from "react-native";

const Header = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Todo App</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#3b82f6",
    alignItems: "center"
  },
  title: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold"
  }
});

export default Header;