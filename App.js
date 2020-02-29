import NavigationService from './services/NavigationService';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import TodoListScreen from './screen/TodoListScreen';
import TodoDetailScreen from './screen/TodoDetailScreen';

import React from 'react';

const MainStack = createStackNavigator(
  {
    TodoListScreen,
    TodoDetailScreen,
  },
  {
    initialRouteName: 'TodoListScreen',
  },
);

const AppContainer = createAppContainer(
  createSwitchNavigator(
    {
      Main: MainStack,
    },
    {
      initialRouteName: 'Main',
    },
  ),
);

class App extends React.Component {
  render() {
    return (
      <AppContainer
        ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}
      />
    );
  }
}

export default App;
