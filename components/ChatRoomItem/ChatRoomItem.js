import React from 'react';
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

    // const getAll = async () => {
    //     try {
    //       const response =  await apiClient.get('users/show/60c45284ae8c0f00220f462b');
    //       console.log("ga", response.data.data);
    //     } catch(e){
    //       console.log(e.message)
    //     }
    //   }
    const getAll = async () => {
        try {
          const response =  await apiClient.get('chats/getListChats');
          console.log("ga", response.data.data);
        } catch(e){
          console.log(e.message)
        }
      }

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


