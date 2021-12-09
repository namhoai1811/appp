import React, {useState, useEffect} from 'react';
import { StyleSheet, Image, Text, View, FlatList, SafeAreaView, } from 'react-native';
import ChatRoomItem from '../components/ChatRoomItem';

import chatRoomsData from '../assets/dummy-data/ChatRoomsData';

export default function HomeChatScreen({navigation}) {

 

    return (
        <SafeAreaView style= {styles.page}>
            <FlatList
                data={chatRoomsData}
                renderItem = {({ item }) => <ChatRoomItem chatRoom= {item} /> }
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
        
    );
}

const styles = StyleSheet.create({
    page: {
        backgroundColor: 'white',
        flex: 1,
    }
})