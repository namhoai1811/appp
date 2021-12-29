import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import ChatNavigation from './navi/ChatNavigation';
import App1 from './src/App1'

export default function App() {
  return (

    <ChatNavigation/>
    // <App1/>
  
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
