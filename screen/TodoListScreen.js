import React from 'react';
import firestore from '@react-native-firebase/firestore';
import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import AddNewItemModal from './AddNewItemModal';
import editImage from '../common/assets/icon/icon_cute_edit.png';
import deleteImage from '../common/assets/icon/icon_cute_delete.png';

class TodoListScreen extends React.Component {
  static navigationOptions = () => {
    return {
      title: 'To Do List',
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      todoList: [],
      editMode: false,
      editItemData: {},
      isVisible: false,
    };
    this.ref = firestore().collection('todoList');
  }

  // Load data from FireStore
  _fetchData = async () => {
    let data = [];
    this.ref.get().then(snapshot => {
      snapshot.docs.forEach(item => {
        let {title, description} = item._data;
        data.push({id: item.id, title, description});
      });
      this.setState({
        todoList: data,
      });
    });
  };

  // When Component Starts Load all the data from FireStore
  async componentDidMount() {
    this._fetchData();
  }

  // Adding new data into FireStore
  _setData = async data => {
    try {
      await this.ref.add(data);
      this._fetchData();
    } catch (e) {
      console.log(e);
    }
  };

  // Adding new item into the Todo List
  _addToList = async val => {
    const {editMode} = this.state;
    let {title, description, editingItemId} = val;
    if (editMode) {
      this.ref.doc(editingItemId).set({
        title,
        description,
      });
      await this.setState({
        editMode: false,
      });
      this._fetchData();
    } else {
      // create new todoList
      this._setData({title, description});
    }
  };

  // Edit items
  _editList = item => {
    this.setState({
      isVisible: true,
      editMode: true,
      editItemData: item,
    });
  };

  // Delete items
  _deleteList = async id => {
    await this.ref.doc(id).delete();
    await this._fetchData();
  };

  // Render the items that are retrieved from FireStore
  renderItemList = () => {
    const {navigation} = this.props;
    const {todoList} = this.state;
    return (
      <View>
        {todoList.map((item, index) => {
          return (
            <TouchableWithoutFeedback
              key={index}
              onPress={() =>
                navigation.navigate('TodoDetailScreen', {data: item})
              }>
              <View
                style={{
                  ...style.Card,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 10,
                }}>
                <View>
                  <Text style={{fontWeight: 'bold'}}>{item.title}</Text>
                  <Text>{item.description}</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <TouchableWithoutFeedback
                    onPress={() => this._editList(item, index)}>
                    <Image style={style.actionsButton} source={editImage} />
                  </TouchableWithoutFeedback>
                  <View style={{width: 10}} />
                  <TouchableWithoutFeedback
                    onPress={() => this._deleteList(item.id)}>
                    <Image style={style.actionsButton} source={deleteImage} />
                  </TouchableWithoutFeedback>
                </View>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </View>
    );
  };

  render() {
    const {editMode, editItemData, isVisible, todoList} = this.state;

    return (
      <View style={{flex: 1, padding: 15}}>
        {isVisible && (
          <AddNewItemModal
            modalVisible={isVisible}
            modalTitle={'New Todo'}
            addToList={val => this._addToList(val)}
            closeModal={() => {
              this.setState({isVisible: false, editMode: false});
            }}
            list={todoList}
            editMode={editMode}
            editData={editItemData}
          />
        )}
        <View style={{paddingVertical: 30}}>
          <Button
            title={'Add New Item'}
            onPress={() =>
              this.setState({
                isVisible: true,
              })
            }
          />
        </View>
        <ScrollView>{this.renderItemList()}</ScrollView>
      </View>
    );
  }
}

const style = StyleSheet.create({
  Input: {
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 3,
    marginBottom: 5,
  },
  Card: {
    borderColor: 'gray',
    padding: 10,
    borderWidth: 1,
    borderRadius: 3,
    backgroundColor: 'white',
  },
  Button: {
    height: 40,
    backgroundColor: 'blue',
    color: 'white',
  },
  breakLine: {
    height: 10,
    width: null,
  },
  actionButtonsContainer: {
    position: 'absolute',
    right: 0,
  },
  actionsButton: {
    width: 25,
    height: 25,
  },
});
export default TodoListScreen;
