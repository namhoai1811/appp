import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeChatScreen from '../screens/HomeChatScreen';
import ChatRommScreen from '../screens/ChatRommScreen';
import HomeHeader from '../components/HomeHeader/HomeHeader';
import ChatRoomHeader from '../components/ChatRoomHeader/ChatRoomHeader';
const Stack = createNativeStackNavigator();



export default function AppNavi() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
        
            <Stack.Screen 
            name="HomeChat" 
            component={HomeChatScreen}
            options = {{ headerTitle: (props) => <HomeHeader {...props} /> }}
            />
            <Stack.Screen 
            name="ChatRom" 
            component={ChatRommScreen}
            options = {{ 
                headerTitle: (props) => <ChatRoomHeader {...props} />, 
                headerBackTitleVisible: true,
            
            }}
            />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
