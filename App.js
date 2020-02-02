import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList,Keyboard, TouchableWithoutFeedback, Alert } from 'react-native';
import Header from './components/header';
import TodoItem from './components/todoitem';
import AddTodo from './components/addtodo';

export default function App() {
  const [todos, setTodos] = useState([
    { text: 'buy coffee', key: '1' },
    { text: 'creae app', key: '2' },
    { text: 'play on the switch', key: '3' },
  ]);

  const pressHandler = (key) => {
    Alert.alert('Delete?', 'Do you want to delete this todo?', [
      { text: 'Yes', onPress: () =>deleteHandler(key) },
      { text: 'No', onPress: () => console.log('alert closed') }
    ])
    
  }

  const deleteHandler =(key) =>{
    setTodos((prevTodos) => {
      return prevTodos.filter(todo => todo.key != key);
    });
  }

  const submitHandler = (text) => {

    if (text.length > 3) {
      setTodos((prevTodos) => {
        return [
          { text: text, key: Math.random().toString() },
          ...prevTodos
        ];
      });
    }
    else {
      Alert.alert('OOPS', 'Todos must be atleast 3 charchters long', [
        { text: 'Understood', onPress: () => console.log('alert closed') }
      ])

    }

  }
  return (

    <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss();
      console.log('dismissed keyboard');
    }}>
      <View style={styles.container}>
        <Header />
        <View style={styles.content}>
          <AddTodo submitHandler={submitHandler} />
          <View style={styles.list}>
            <FlatList
              data={todos}
              renderItem={({ item }) => (
                <TodoItem item={item} pressHandler={pressHandler} />
              )}
            />
          </View>
        </View>
      </View>    
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 40,
    flex: 1,
  },
  list: {
    marginTop: 20,
    flex: 1,
  }
});
