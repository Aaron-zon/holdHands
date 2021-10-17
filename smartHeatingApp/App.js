// In App.js in a new project

import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Nav from './src/Nav'

class App extends React.Component {
  render() {
    return (
      <View style={{flex:1}}>
        <Nav></Nav>
      </View>
    );
  }
}

export default App;