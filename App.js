import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import ChatNavigation from './navi/ChatNavigation';
import App1 from './src/App1'
import ChatMessengerScreen from './screens/ChatMessengerScreen';

export default function App() {
  return (

    <ChatNavigation/>
    // <App1/>
    // <ChatMessengerScreen/>

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
