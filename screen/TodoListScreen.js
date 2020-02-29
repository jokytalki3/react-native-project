import React from 'react';
import firestore from '@react-native-firebase/firestore';
import {
  Alert,
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import AddNewItemModal from './AddNewItemModal';

const Separator = () => <View style={style.breakLine} />;

class TodoListScreen extends React.Component {
  static navigationOptions = () => {
    return {
      title: 'To do List',
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      todoList: [],
      editMode: false,
      editingItemId: '',
      isVisible: false,
    };
    this.ref = firestore().collection('todoList');
  }

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

  async componentDidMount() {
    this._fetchData();
  }

  errorDialog = (errorTitle, errorDesc) => {
    Alert.alert(errorTitle, errorDesc, [{text: 'OK'}]);
  };

  _setData = async data => {
    try {
      await this.ref.add(data);
      this._fetchData();
    } catch (e) {
      console.log(e);
    }
  };

  _resetForm = () => {
    this.setState({
      title: '',
      description: '',
    });
  };

  _addToList = async () => {
    let {title, description, editingItemId} = this.state;
    if (this.validate()) {
      if (this.state.editMode) {
        this.ref.doc(editingItemId).set({
          title,
          description,
        });
        this.setState({
          editMode: false,
        });
        this._fetchData();
      } else {
        // create new todoList
        this._setData({title, description});
      }
      this._resetForm();
    }
  };

  _editList = item => {
    let {title, description} = item;
    this.setState({
      title,
      description,
      editMode: true,
      editingItemId: item.id,
    });
  };

  _deleteList = async id => {
    await this.ref.doc(id).delete();
    await this._fetchData();
    this._resetForm();
  };

  validate = () => {
    const {title, description, todoList} = this.state;
    let validated = true;
    if (title === '' || description === '') {
      this.errorDialog('Error', 'Field Cannot be Empty');
      validated = false;
      return validated;
    }

    todoList.forEach(item => {
      if (item.title === title) {
        this.errorDialog('Error', 'Title cannot be the same');
        validated = false;
        return false;
      } else {
        validated = true;
      }
    });
    return validated;
  };

  renderItemList = () => {
    const {todoList} = this.state;
    return (
      <View>
        {todoList.map((item, index) => {
          return (
            <TouchableWithoutFeedback
              key={index}
              onPress={() =>
                this.props.navigation.navigate('TodoDetailScreen', {data: item})
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
                    <Image
                      style={style.actionsButton}
                      source={require('../common/assets/icon/icon_cute_edit.png')}
                    />
                  </TouchableWithoutFeedback>
                  <View style={{width: 10}} />
                  <TouchableWithoutFeedback
                    onPress={() => this._deleteList(item.id)}>
                    <Image
                      style={style.actionsButton}
                      source={require('../common/assets/icon/icon_cute_delete.png')}
                    />
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
    const {editMode, isVisible} = this.state;
    const ButtonText = editMode ? 'UpdateItem' : 'Add To List';

    return (
      <View style={{flex: 1, padding: 15}}>
        <AddNewItemModal
          modalVisible={isVisible}
          addToList={() => this._addToList()}
        />
        <View style={style.Card}>
          <TextInput
            style={style.Input}
            onChangeText={v => this.setState({title: v})}
            placeholder={'Title'}
            value={this.state.title}
          />
          <Separator />
          <TextInput
            style={style.Input}
            onChangeText={v => this.setState({description: v})}
            placeholder={'Description'}
            value={this.state.description}
          />
          <Separator />
          <Button title={ButtonText} onPress={() => this._addToList()} />
        </View>
        <Separator />
        <Button
          title={'Add New Item'}
          onPress={() =>
            this.setState({
              isVisible: true,
            })
          }
        />
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
