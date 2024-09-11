import React from 'react'
import {
    ActivityIndicator,
    AsyncStorage,
    Button,
    StatusBar,
    StyleSheet,
    View,
    Text
  } from 'react-native';


export default class NewGroup extends React.Component {
    
    render() {
      return (
        <View>
          <Text>NewGroup</Text>
          <StatusBar barStyle="light-content" hidden={false} translucent={true} />
        </View>
      );
    }

  }