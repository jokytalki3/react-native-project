import React from 'react';
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

function Separator() {
  return <View style={style.breakLine} />;
}

class TodoListScreen extends React.Component {
  static navigationOptions = () => {
    return {
      title: 'To do List',
    };
  };

  state = {
    title: '',
    description: '',
    todoList: [],
    editMode: false,
    editingItemIndex: '',
  };

  componentDidMount() {
    console.log('wtf is going on');
  }

  errorDialog = (errorTitle, errorDesc) => {
    Alert.alert(
      errorTitle,
      errorDesc,
      [
        {text: 'OK'},
      ],
    );
  };
  _addToList = () => {
    let {title, description} = this.state;
    let ToDoListCopy = this.state.todoList;
    if (this.validate()) {
      if (this.state.editMode) {
        ToDoListCopy[this.state.editingItemIndex] = {title, description}
        this.setState({
          title: '',
          description: '',
          editMode: false,
        });
      } else {
        ToDoListCopy.push({
          title,
          description,
        });
      }
      this.setState({
        todoList: ToDoListCopy,
        title: '',
        description: '',
      });
    }
  };

  _editList = (item, index) => {
    let {title,description} = item;
    this.setState({
      title,
      description,
      editMode: true,
      editingItemIndex: index,
    })
  };

  _deleteList = (index) => {
    let ToDoListCopy = this.state.todoList;
    ToDoListCopy.splice(index, 1);
    this.setState({
      todoList: ToDoListCopy,
      title: '',
      description: '',
    })
  };

  validate = () => {
    const {title, description, todoList} = this.state;
    let validated = true;
    if(title === "" || description === "") {
      this.errorDialog('Error', 'Field Cannot be Empty');
      validated = false;
      return validated;
    }

    todoList.forEach((item) => {
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
    const { todoList } = this.state;
    return(
      <View>
        {
          todoList.map(((item, index) => {
            return (
              <View key={index} style={{...style.Card, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10}}>
                <View>
                  <Text style={{fontWeight: 'bold'}}>{item.title}</Text>
                  <Text>{item.description}</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <TouchableWithoutFeedback onPress={()=> this._editList(item, index)}>
                    <Image style={style.actionsButton} source={require('../common/assets/icon/icon_cute_edit.png')} />
                  </TouchableWithoutFeedback>
                  <View style={{width: 10}} />
                  <TouchableWithoutFeedback onPress={()=> this._deleteList(index)}>
                    <Image style={style.actionsButton} source={require('../common/assets/icon/icon_cute_delete.png')} />
                  </TouchableWithoutFeedback>
                </View>
              </View>
            )
          }))
        }
      </View>
    )
  };

  render() {
    let ButtonText = '';
    if (this.state.editMode) {
      ButtonText = 'Update Item'
    } else {
      ButtonText = 'Add To List'
    }
    return (
      <View style={{flex: 1, padding: 15}}>
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
          <Button title={ButtonText} onPress={()=>this._addToList()} />
        </View>
        <Separator/>
        <ScrollView>
          {this.renderItemList()}
        </ScrollView>
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
  }
});
export default TodoListScreen;
