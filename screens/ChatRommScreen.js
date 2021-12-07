import React from 'react';
import { Text, View, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/core';

import Message from '../components/Message';

import chatRoomData from '../assets/dummy-data/Chats';
import MessageInput from '../components/MessageInput';

export default function ChatRommScreen() {

    const route = useRoute();
    const navigation = useNavigation();

    // alert(route.params?.id);

    navigation.setOptions({title: 'Hoai Ndddam'})

    return (
        <SafeAreaView style = {styles.page}>
            <View style={styles.list1}>
                <FlatList 
                data = {chatRoomData.messages}
                renderItem= {({ item }) => <Message message={item}/>}
                inverted
             />
            </View>

            <View style={styles.list2}>
                <MessageInput  />
            </View> 

        </SafeAreaView> 
    );
}

const styles = StyleSheet.create({
    page: {
        flex:1,
    },
    list1: {
        height: '90%'
    },
    list2: {
        height: '10%'
        
    }
})