import React, { useState, useEffect}  from 'react';
import { Image, Text, View , Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import styles from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiClient from '../../api/Client';

export default function ChatRoomItem({ chatRoom }) {
    
    
    const navigation = useNavigation();
    const [userData, setuserData] = useState();
    console.log(chatRoom)
    
    const getUser = async () => {

        const userToken = await AsyncStorage.getItem('userToken');
        const userId = await AsyncStorage.getItem('userId');

        let userFriend = '';

        if (chatRoom.member[0]==userId) userFriend = chatRoom.member[1];
        else userFriend = chatRoom.member[0];

        let auth = {
            headers: {
                authorization: "token " + userToken,
            }
        }
        
        try {

        const response =  await apiClient.get(`users/show/${userFriend}`, auth);
            if (response.data) {
                return response.data.data;
        }
        } catch(e){
        console.log('error when getting data ', e.message)
        }
    }

    useEffect(  () => {
        getUser().then(setuserData);
    }, [])


    const _onPress = () => {
        navigation.navigate('ChatRom', { _id: chatRoom._id});
    }

    return (
        <>
        {userData && 
        <Pressable 
            style={styles.container}
            onPress={_onPress}
        >
            <Image source={{uri: `http://192.168.1.13:8000/files/${userData.avatar.fileName}`}} style={styles.image}></Image>
            
            {/* { chatRoom.newMessages ? <View style= {styles.badgeContainer}>
                <Text style= {styles.badgeText}>{chatRoom.newMessages} </Text>
            </View> :null} */}

            <View style={styles.rightContainer}>     
                <View style= {styles.row}>
                    <Text style={styles.name}>{userData.username} </Text>
                    <Text style={styles.text}>{chatRoom.createdAt}</Text>
                </View>
                {/* <Text numberOfLines={1}  style={styles.text}>{chatRoom.lastMessage.content} </Text> */}
            </View>    
            
        </Pressable>
        }
        </>
    
    );
}


