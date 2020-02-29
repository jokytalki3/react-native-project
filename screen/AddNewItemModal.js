import React from 'react';
import {View, Modal, TextInput, Button, StyleSheet} from 'react-native';

const Separator = () => <View style={style.breakLine} />;

class AddNewItemModal extends React.Component {
  props = {
    itemTitle: '',
    itemDescription: '',
    addToList: Function,
    modalVisible: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      editMode: false,
    };
  }

  _add = () => {
    const {addToList} = this.props;
    addToList();
  };

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
        <Modal animationType="slide" transparent={false} visible={modalVisible}>
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
            <Button title={ButtonText} onPress={() => this._add()} />
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
});
export default AddNewItemModal;
