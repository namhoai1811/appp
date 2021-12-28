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
    
    const [userData, setuserData] = useState();

    const getUser = async () => {

        const userToken = await AsyncStorage.getItem('userToken');

        let auth = {
            headers: {
                authorization: "token " + userToken,
            }
        }
        
        try {
        const response =  await apiClient.get('users/show/60c490859ecf82002257f564', auth);
        if (response.data) {
            // setuserData(response.data.data); 
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
        navigation.navigate('ChatRom', { id: chatRoom.id});
    }

    return (
        <>
        {userData && 
        <Pressable 
            style={styles.container}
            onPress={_onPress}
        >
            <Image source={{uri: `http://192.168.1.13:8000/files/0d396ef3-d749-4b83-a768-bfb6533990f4.png`}} style={styles.image}></Image>
            
            { chatRoom.newMessages ? <View style= {styles.badgeContainer}>
                <Text style= {styles.badgeText}>{chatRoom.newMessages} </Text>
            </View> :null}

            <View style={styles.rightContainer}>     
                <View style= {styles.row}>
                    <Text style={styles.name}>{userData.username} </Text>
                    <Text style={styles.text}>{chatRoom.lastMessage.createdAt}</Text>
                </View>
                <Text numberOfLines={1}  style={styles.text}>{chatRoom.lastMessage.content} </Text>
            </View>    
            
        </Pressable>
        }
        </>
    
    );
}


