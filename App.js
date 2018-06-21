import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import Home from './screens/home';
import ARScene from './screens/ARScene';

export default class App extends React.Component {
  render() {
    return <RootNavigator />;
  }
}

const RootNavigator = createStackNavigator(
  {
    Home: { screen: Home },
    ARScene: { screen: ARScene }
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false
    }
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
