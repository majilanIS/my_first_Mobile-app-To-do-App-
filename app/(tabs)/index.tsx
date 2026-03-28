import Header from "@/app/components/Header";
import { api } from "@/convex/_generated/api";
import useTheme from "@/hooks/useTheme";
import { useMutation, useQuery } from "convex/react";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const { toggleDarkMode, colors } = useTheme();
  // const [isDarkMode, setIsDarkMode] = useState(false);

  const [inputText, setInputText] = useState("");
  // ...existing code...

  const todos = useQuery(api.todos.getTodo);
  const addTodos = useMutation(api.todos.addTodo);
  const deleteTodos = useMutation(api.todos.deleteTodo);

  // ✅ Styles MUST be here (inside component)
  const homeStyles = StyleSheet.create({
    container: {
      flex: 1,
    },

    safeArea: {
      flex: 1,
      padding: 16,
    },

    toggleButton: {
      marginBottom: 12,
      alignSelf: "flex-end",
    },

    toggleText: {
      color: colors.primary,
      fontWeight: "600",
    },

    input: {
      borderWidth: 1,
      borderColor: colors.border || "#ccc",
      padding: 12,
      borderRadius: 10,
      marginBottom: 12,
      // backgroundColor: colors.card,
      color: colors.text,
    },

    addButton: {
      backgroundColor: colors.primary || "#007AFF",
      padding: 14,
      borderRadius: 10,
      alignItems: "center",
      marginBottom: 16,
    },

    buttonText: {
      color: "#fff",
      fontWeight: "bold",
      fontSize: 16,
    },

    inputList: {
      marginTop: 10,
    },

    todoItem: {
      padding: 14,
      marginVertical: 6,
      // backgroundColor: colors.card || "#fff",
      borderRadius: 10,

      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowRadius: 4,
      shadowOffset: { width: 0, height: 2 },

      elevation: 2,
    },

    emptyText: {
      textAlign: "center",
      marginTop: 20,
      color: colors.text,
    },
    deletebutton:{
      position: "absolute",
      right: 10,
      top: 10,
    },
    deleteText: {
      color: "red",
      fontWeight: "bold",
    },
      todoRow: {
      // backgroundColor: colors.card || "#fff",
      padding: 14,
      marginVertical: 6,
      borderRadius: 10,

      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowRadius: 4,
      shadowOffset: { width: 0, height: 2 },
      elevation: 2,
    },
  });

 const handleAddTodo = async () => {
    if (inputText.trim() === "") {
      Alert.alert("Please enter a todo");
      return;
    }
    try {
       await addTodos({ text: inputText });
       setInputText("");
       Alert.alert("Success", "Todo added successfully!");
    } catch (error) {
      Alert.alert("Error", "Failed to add todo. Please try again.");
    }
  }

  const handleDeleteTodo = async (id: string) => {
    try {
      await deleteTodos({ id });
      Alert.alert("Success", "Todo deleted successfully!");
    } catch (error) {
      Alert.alert("Error", "Failed to delete todo. Please try again.");
    }
  };
  
  return (
    <LinearGradient
      colors={colors.gradients.background}
      style={homeStyles.container}
    >
      <SafeAreaView style={homeStyles.safeArea}>
        <Header />

        {/* Toggle Theme */}
        <TouchableOpacity
          onPress={toggleDarkMode}
          style={homeStyles.toggleButton}
        >
          <Text style={homeStyles.toggleText}>Toggle Theme</Text>
        </TouchableOpacity>

        {/* Input */}
        <TextInput
          placeholder="Enter a new todo..."
          placeholderTextColor={colors.text}
          value={inputText}
          onChangeText={setInputText}
          style={homeStyles.input}
          keyboardType="default"
          autoCapitalize="sentences"
          onSubmitEditing={handleAddTodo}
        />

        {/* Add Button */}
        <TouchableOpacity
          onPress={handleAddTodo}
          style={homeStyles.addButton}
          activeOpacity={0.7}
        >
          <Text style={homeStyles.buttonText}>Add Todo</Text>
        </TouchableOpacity>

        {/* Empty State */}
        {(!todos || todos.length === 0) && (
          <Text style={homeStyles.emptyText}>
            No todos yet 👀
          </Text>
        )}
        {/* List */}
        <FlatList
          style={homeStyles.inputList}
          data={todos || []}
          keyExtractor={item => item._id}
          renderItem={({ item }) => (
            <TouchableOpacity activeOpacity={0.7} style={homeStyles.todoRow}>
              <Text style={homeStyles.todoItem}>{item.text}</Text>
              <TouchableOpacity
                style={homeStyles.deletebutton}
                onPress={() => handleDeleteTodo(item._id)}
              >
                <Text style={homeStyles.deleteText}>X</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          )}
        />
      </SafeAreaView>
    </LinearGradient>
  );
}