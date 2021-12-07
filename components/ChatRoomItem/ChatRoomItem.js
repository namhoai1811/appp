import React from 'react';
import { Image, Text, View , Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import styles from './styles';


export default function ChatRoomItem({ chatRoom }) {
    
    const user = chatRoom.users[1];
    const navigation = useNavigation()

    const _onPress = () => {
        navigation.navigate('ChatRom', { id: chatRoom.id});
        // alert('id' + user.name);

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


