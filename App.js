import React from 'react';
import {StyleSheet} from 'react-native';

import ChatNavigation from './navi/ChatNavigation';
import App1 from './src/App1';

export default function App() {
  return (
    <ChatNavigation />
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
