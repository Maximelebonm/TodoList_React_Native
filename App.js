import { useEffect, useState } from "react";
import { ScrollView, Text, View, Alert } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { appStyle } from "./App.style";
import { Header } from "./components/header/Header";
import { CardTodo } from "./components/cardTodo/CardTodo";
import { TabBottomMenu } from "./components/footer/TabBottomMenu";
import { ButtonAdd } from "./components/buttonAdd/ButtonAdd";
import Dialog from "react-native-dialog/";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";
let isFirstRender = true;
let isLoadUpdate = false;

export default function App() {
  const [selectedTabName, setSelectedTabName] = useState("all");
  const [isAddDialogVisible, setIsAddDialogVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [todoList, setTodoList] = useState([]);
  useEffect(() => {
    getTodoList();
  }, []);

  useEffect(() => {
    if (isLoadUpdate) {
      isLoadUpdate = false;
    } else {
      if (!isFirstRender) {
        saveTodoList();
      } else {
        isFirstRender = false;
      }
    }
  }, [todoList]);
  async function saveTodoList() {
    try {
      await AsyncStorage.setItem("@todolist", JSON.stringify(todoList));
    } catch (error) {
      alert("Erreur" + error);
    }
  }

  async function getTodoList() {
    try {
      const stringifiedTodolist = await AsyncStorage.getItem("@todolist");
      if (stringifiedTodolist !== null) {
        const parsedTodoList = JSON.parse(stringifiedTodolist);
        isLoadUpdate = true;
        setTodoList(parsedTodoList);
      }
    } catch (error) {
      alert("Erreur" + error);
    }
  }

  function getFilteredTodoList() {
    switch (selectedTabName) {
      case "all":
        return todoList;
      case "inProgress":
        return todoList.filter((item) => !item.isCompleted);
      case "done":
        return todoList.filter((item) => item.isCompleted);
    }
  }

  function renderTodolist() {
    return getFilteredTodoList().map((todoItem) => (
      <View style={appStyle.cardItem} key={todoItem.id}>
        <CardTodo
          todo={todoItem}
          onPress={updateTodo}
          onLongPress={deleteTask}
        />
      </View>
    ));
  }

  function updateTodo(props) {
    const row = todoList.findIndex((item) => item.id === props.id);
    const updateTodo = {
      ...props,
      isCompleted: !props.isCompleted,
    };
    const updateTodoList = [...todoList];
    updateTodoList[row] = updateTodo;
    setTodoList(updateTodoList);
  }
  function selectedTab(props) {
    setSelectedTabName(props);
  }

  function deleteTask(todoToDeleted) {
    Alert.alert("Supression", "supprimer cette tache", [
      {
        text: "Supprimer",
        stle: "destructive",
        onPress: () => {
          setTodoList(todoList.filter((todo) => todo.id !== todoToDeleted.id));
        },
      },
      {
        text: "annuler",
        style: "cancel",
      },
    ]);
  }

  function openPopUp() {
    setIsAddDialogVisible(true);
  }

  function addTask() {
    const newTask = {
      id: uuidv4(),
      name: inputValue,
      isCompleted: false,
    };
    setTodoList([...todoList, newTask]);
    setIsAddDialogVisible(false);
  }
  console.log(todoList);
  return (
    <>
      <SafeAreaProvider>
        <SafeAreaView style={appStyle.container}>
          <View style={appStyle.header}>
            <Header />
          </View>
          <View style={appStyle.body}>
            <ScrollView>{renderTodolist()}</ScrollView>
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
      <ButtonAdd onPress={openPopUp} />
      <View style={appStyle.footer}>
        <TabBottomMenu
          todoList={todoList}
          selectedTabName={selectedTabName}
          onPress={selectedTab}
        />
        <Dialog.Container
          visible={isAddDialogVisible}
          onBackdropPress={() => {
            setIsAddDialogVisible(false);
          }}
        >
          <Dialog.Title>Créer une tâche</Dialog.Title>
          <Dialog.Description>
            Choisis un nom pour la nouvelle tache
          </Dialog.Description>
          <Dialog.Input onChangeText={setInputValue} />
          <Dialog.Button
            disabled={inputValue.trim().length === 0}
            label="Creer"
            onPress={addTask}
          ></Dialog.Button>
        </Dialog.Container>
      </View>
    </>
  );
}
