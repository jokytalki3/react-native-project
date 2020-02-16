import {NavigationActions} from 'react-navigation';

let _navigator;

const setTopLevelNavigator = navigationRef => {
  _navigator = navigationRef;
};

const navigate = (routeName, params) => {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    }),
  );
};

export default {
  navigate, setTopLevelNavigator,
};
