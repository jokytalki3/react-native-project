import React from 'react';
import {
  View,
  Text,
  Modal,
  TextInput,
  Button,
  StyleSheet,
  Alert,
} from 'react-native';

const Separator = () => <View style={style.breakLine} />;

class AddNewItemModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      title: '',
      description: '',
      editMode: false,
    };
  }

  _add = () => {
    let {title, description, id} = this.state;
    const {addToList} = this.props;
    if (this.props.editMode) {
      addToList({title, description, editingItemId: id});
    } else {
      if (this.validate()) {
        addToList({title, description});
      }
    }
    this.props.closeModal();
  };

  validate = () => {
    const {title, description} = this.state;
    let validated = true;
    if (title === '' || description === '') {
      this.errorDialog('Error', 'Field Cannot be Empty');
      validated = false;
      return validated;
    }

    for (let item of this.props.list) {
      if (item.title === title) {
        this.errorDialog('Error', 'Title cannot be the same');
        validated = false;
        break;
      } else {
        validated = true;
      }
    }
    return validated;
  };

  errorDialog = (errorTitle, errorDesc) => {
    Alert.alert(errorTitle, errorDesc, [{text: 'OK'}]);
  };

  componentDidMount() {
    if (this.props.editMode) {
      let {title, description, id} = this.props.editData;
      this.setState({title, description, id});
    }
  }

  render() {
    const {editMode} = this.state;
    const {modalVisible} = this.props;
    let ButtonText = '';
    if (editMode) {
      ButtonText = 'Update Item';
    } else {
      ButtonText = 'Add To List';
    }
    return (
      <View>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => this.props.closeModal()}>
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'center',
            }}>
            <View style={{flex: 1, opacity: 0.3, backgroundColor: 'gray'}} />
            <View style={style.Card}>
              <View>
                <Text>{this.props.title}</Text>
              </View>
              <Separator />
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
              <Button title={ButtonText} onPress={() => this._add()} />
              <Separator />
              <Button
                title={'Cancel'}
                color={'red'}
                onPress={() => this.props.closeModal()}
              />
            </View>
          </View>
        </Modal>
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
    marginHorizontal: 30,
    backgroundColor: 'white',
    position: 'absolute',
    left: 0,
    right: 0,
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
});
export default AddNewItemModal;
