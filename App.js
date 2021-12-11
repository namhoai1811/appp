import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import HomeChatScreen from './screens/HomeChatScreen';
import ChatRommScreen from './screens/ChatRommScreen';
import ChatNavigation from './navi/ChatNavigation';

export default function App() {
  return (

  // <StackNavigation/>
    // <AppNavi/>
    <ChatNavigation/>

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
