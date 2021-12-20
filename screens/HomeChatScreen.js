import React, {useState, useEffect} from 'react';
import { StyleSheet, Image, Text, View, FlatList, SafeAreaView, } from 'react-native';
import ChatRoomItem from '../components/ChatRoomItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiClient from '../api/Client';

import chatRoomsData from '../assets/dummy-data/ChatRoomsData';

export default function HomeChatScreen({navigation}) {

    const [data, setData] = useState()
    const getAll = async () => {

        // const userToken =  AsyncStorage.getItem('userToken');
        const userToken = await AsyncStorage.getItem('userToken');

        let auth = {
            headers: {
                authorization: "token " + userToken,
            }
        }
        
        try {
          const response =  await apiClient.get('chats/getListChats', auth);
          if (response.data) {
          
            // console.log("ga", response.data.data);
            return response.data.data;
              
          }
        } catch(e){
          console.log('error when getting data ', e.message)
        }
    }

    useEffect(() => {
        setData(getAll());
    }, [])

    return (
        <>
        {data &&
        <SafeAreaView style= {styles.page}>
            <FlatList
                data={chatRoomsData}
                renderItem = {({ item }) => <ChatRoomItem chatRoom= {item} /> }
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
        }
        </>
        
        
    );
}

const styles = StyleSheet.create({
    page: {
        backgroundColor: 'white',
        flex: 1,
    }
})