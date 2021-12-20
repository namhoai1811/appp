import React, { useState, useEffect}  from 'react';
import { Image, Text, View , Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import styles from './styles';
// import GetToken from '../../api/GetToken';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiClient from '../../api/Client';

export default function ChatRoomItem({ chatRoom }) {
    
    const user = chatRoom.users[1];
    const navigation = useNavigation()
    // const GetToken =  AsyncStorage.getItem('userToken');


    // const [data, setData] = useState()
    

    // const getAll = async () => {

    //     // const userToken =  AsyncStorage.getItem('userToken');
    //     const userToken = await AsyncStorage.getItem('userToken');

    //     let auth = {
    //         headers: {
    //             authorization: "token " + userToken,
    //         }
    //     }
        
    //     try {
    //       const response =  await apiClient.get('chats/getListChats', auth);
    //       if (response.data) {
          
    //         console.log("ga", response.data.data);
    //         return response.data.data;
              
    //       }
    //     } catch(e){
    //       console.log('error when getting data ', e.message)
    //     }
    // }

    // useEffect(() => {
    //     setData(getAll());
    // }, [])


    const _onPress = () => {
        // navigation.navigate('ChatRom', { id: chatRoom.id});
        // // alert('id' + user.name);
        // // console.log(GetToken._W);
        getAll();
    }

    return (
        <Pressable style={styles.container}
            onPress={_onPress}
        >
            <Image source={{uri: user.imageUri}} style={styles.image}></Image>
            
            { chatRoom.newMessages ? <View style= {styles.badgeContainer}>
                <Text style= {styles.badgeText}>{chatRoom.newMessages} </Text>
            </View> :null}

            <View style={styles.rightContainer}>     
                <View style= {styles.row}>
                    <Text style={styles.name}>{user.name} </Text>
                    <Text style={styles.text}>{chatRoom.lastMessage.createdAt}</Text>
                </View>
                <Text numberOfLines={1}  style={styles.text}>{chatRoom.lastMessage.content} </Text>
            </View>    
            
        </Pressable>
        
    );
}


