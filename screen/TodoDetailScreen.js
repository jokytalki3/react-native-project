import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

const Separator = () => <View style={style.breakLine} />;

class TodoDetailScreen extends React.Component {
  static navigationOptions = () => {
    return {
      title: 'Todo Details',
    };
  };

  constructor(props) {
    super(props);
  }

  async componentDidMount() {}

  render() {
    let {data} = this.props.navigation.state.params;
    return (
      <View style={{flex: 1, padding: 15}}>
        <Text>
          {JSON.stringify(data)}
        </Text>
      </View>
    );
  }
}

const style = StyleSheet.create({});
export default TodoDetailScreen;
