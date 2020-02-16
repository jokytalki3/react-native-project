import AsyncStorage from '@react-native-community/async-storage'

export const _setTodoList = async (data) => {
  try {
    await AsyncStorage.setItem('todoList', data)
  } catch (e) {
    console.log(e)
  }
};

export const _getTodoList = async () => {
  try {
    const value = await AsyncStorage.getItem('todoList');
    if (value!==null) {
      return value
    }
    return value
  } catch (e) {
    console.log(e)
  }
};
