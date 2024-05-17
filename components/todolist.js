// components/todolist.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import useStore from "./store";

const ToDoList = () => {
  const { todos, addTodo, deleteTodo, editTodo } = useStore();
  const [todo, setTodo] = useState({
    todo: "",
    name: "",
    schoolId: "",
    sectionCode: "",
    courseDescription: "",
    courseName: "",
    academicYear: "",
    idPicture: "",
  });
  const [editId, setEditId] = useState(null);

  const handleInputChange = (name, value) => {
    setTodo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submitTodo = () => {
    if (editId) {
      editTodo({
        ...todo,
        id: editId,
      });
      setEditId(null);
    } else {
      addTodo({
        ...todo,
        id: Date.now().toString(), // Using timestamp as unique id
      });
    }
    clearForm();
  };

  const clearForm = () => {
    setTodo({
      todo: "",
      name: "",
      schoolId: "",
      sectionCode: "",
      courseDescription: "",
      courseName: "",
      academicYear: "",
      idPicture: "",
    });
  };

  const handleEdit = (item) => {
    setTodo(item);
    setEditId(item.id);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="To do"
        value={todo.todo}
        onChangeText={(text) => handleInputChange("todo", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={todo.name}
        onChangeText={(text) => handleInputChange("name", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="School ID"
        value={todo.schoolId}
        onChangeText={(text) => handleInputChange("schoolId", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Section Code"
        value={todo.sectionCode}
        onChangeText={(text) => handleInputChange("sectionCode", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Course Description"
        value={todo.courseDescription}
        onChangeText={(text) => handleInputChange("courseDescription", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Course Name"
        value={todo.courseName}
        onChangeText={(text) => handleInputChange("courseName", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Academic Year"
        value={todo.academicYear}
        onChangeText={(text) => handleInputChange("academicYear", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="ID Picture URL"
        value={todo.idPicture}
        onChangeText={(text) => handleInputChange("idPicture", text)}
      />
      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#FAC898", width: "12%" }]}
        onPress={submitTodo}
      >
        <Text style={styles.buttonText}>To Do</Text>
      </TouchableOpacity>
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Image source={{ uri: item.idPicture }} style={styles.image} />
            <Text> {item.todo} </Text>
            <Text> {item.name} </Text>
            <Text> {item.schoolId} </Text>
            <Text> {item.sectionCode} </Text>
            <Text> {item.courseDescription} </Text>
            <Text> {item.courseName} </Text>
            <Text> {item.academicYear} </Text>
            <TouchableOpacity
              style={[
                styles.button,
                { backgroundColor: "#FAC898", width: "20%" },
              ]}
              title="Edit"
              onPress={() => handleEdit(item)}
            >
              <Text style={styles.buttonText}>Edit List</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.button,
                { backgroundColor: "#FAC898", width: "20%" },
              ]}
              title="Delete"
              onPress={() => deleteTodo(item.id)}
            >
              <Text style={styles.buttonText}>Check List</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#B1907F", // Changed background color
    paddingTop: 30,
  },
  input: {
    height: 40,
    marginBottom: 12,
    padding: 10,
    borderRadius: 50,
    backgroundColor: "#FFFFFF",
  },
  button: {
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: "45%",
  },
  buttonText: {
    color: "  #B1907F", // Changed text color
    textAlign: "center",
  },
  item: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
  },
  image: {
    flex: 1,
    width: 300,
    height: 300,
    marginBottom: 5,
  },
});

export default ToDoList;
