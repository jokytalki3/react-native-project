import React from 'react';
import {Text, View} from 'react-native';

class TodoListDetailsScreen extends React.Component {
  static navigationOptions = () => {
    return {
      title: 'Item Details',
    };
  };
  state = {
    itemDetails: {},
    index: 0,
  };

  componentDidMount(): void {
    this.setItemDetails();
  }

  setItemDetails = () => {
    const {navigation} = this.props;
    this.setState({
      itemDetails: navigation.getParam('itemObject'),
    });
  };

  render() {
    const {itemDetails} = this.state;
    return (
      <View>
        <Text>Your Item Title is {itemDetails.title}</Text>
        <Text>Your Item Description is {itemDetails.description}</Text>
      </View>
    );
  }
}

export default TodoListDetailsScreen;
