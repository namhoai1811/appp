import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import HomeChatScreen from './screens/HomeChatScreen';
import ChatRommScreen from './screens/ChatRommScreen';
// import StackNavigation from './navigation/StackNavigation';


import AppNavi from './navi/AppNavi';
export default function App() {
  return (
  // <ChatRommScreen/>
  // <HomeChatScreen/>
  // <StackNavigation/>
    <AppNavi/>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
