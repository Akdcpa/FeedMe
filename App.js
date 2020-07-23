/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  Alert
} from 'react-native'; 

import {
  Auth,
  Feed
} from './src/screens/index'

import {
  NavigationContainer
} from '@react-navigation/native'

import {
  createStackNavigator
} from '@react-navigation/stack'

const Stack = createStackNavigator(); 
class App extends React.Component {

  
  render() { 
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="FeedMe" >
            <Stack.Screen component={Auth} 
                          name="FeedMe" 
                          options={{
                            headerTitleAlign:'center'
                          }}
                          />
            <Stack.Screen component={Feed} 
                          name="News"
                           />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
} 

export default App;
