import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from "./screens/HomeScreen";
import DetailsScreen from "./screens/DetailsScreen";

import ChatRommScreen from './screens/ChatRommScreen';
import HomeChatScreen from './screens/HomeChatScreen';

import ChatRoomHeader from './app/component/ChatRoomHeader/ChatRoomHeader';
import HomeHeader from './app/component/HomeHeader/HomeHeader';

const Stack = createNativeStackNavigator();


function AppNavi() {
  return (

  <NavigationContainer>
    <Stack.Navigator>
   
    <Stack.Screen 
      name="HomeChat" 
      component={HomeChatScreen}
      options = {{ headerTitle: HomeHeader}}
       />
    <Stack.Screen 
      name="ChatRom" 
      component={ChatRommScreen}
      options = {{ 
        headerTitle: ChatRoomHeader, 
        // headerBackTitleVisible: false,
     
      }}
      />
    </Stack.Navigator>
  </NavigationContainer>
  );
}

export default AppNavi;