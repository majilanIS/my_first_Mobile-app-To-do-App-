import useTheme from "@/hooks/useTheme";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const { toggleDarkMode } = useTheme();
  return (
    <View
      style={styles.container}
    >
      <Text style={styles.content}>
        Edit app/index.tsx to edit this screen. <Text>thanks this is working!</Text>
      </Text>
      <TouchableOpacity onPress={toggleDarkMode}>
        <Text style={styles.togglebutton}>Light Mode</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(85, 141, 112)",
    gap: 50,
  },
  content: {
    fontSize: 24,
    textAlign: "center",
  },
  togglebutton: {
    fontSize: 18,
    color: "white",
  }
})
