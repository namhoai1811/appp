import { Text, View, StyleSheet, FlatList, SafeAreaView ,TouchableWithoutFeedback,Keyboard } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import React, { useState, useCallback, useEffect, useLayoutEffect, useRef } from "react";
import { useRoute, useNavigation } from '@react-navigation/core';
import { Avatar, Icon } from "react-native-elements";

import { getMessages, sendMessage} from '../components/ChatRoomItem/apiMessager';


export default function ChatMessengerScreen() {

    const route = useRoute();
    const navigation = useNavigation();
    const [messages, setMessages] = useState([]);
    const { chatId, userData, userId } = route.params;
    // console.log(userData)
    const receiverId = userData._id;
    const senderId = userId;
    console.log(chatId)
    
  

    useLayoutEffect(() => {
        navigation.setOptions({
        headerLeft: () => (
            <View style={styles.headerLeft}>
            <Icon name={"chevron-left"} size={40} 
            onPress={() => {navigation.navigate("HomeChat")}} 
            />
            <Avatar rounded source={{uri : `http://192.168.1.13:8000/files/${userData.avatar.fileName}`}} />
            </View>
        ),
        title: `          ${userData.username}`,
        headerRight: () => <View><Icon onPress = {fetchMessages} name={"menu"} size={40} /></View>,
        });
    }, []);

    // useEffect(() => {
    //     setMessages([
    //     {
    //         _id: 1,
    //         text: 'Hello developer',
    //         createdAt: new Date(),
    //         user: {
    //         _id: 2,
    //         name: 'React Native',
    //         avatar: `http://192.168.1.13:8000/files/${userData.avatar.fileName}`,
    //         },
    //     },
    //     ])
    // }, [])

    const fetchMessages = async () => {
        try {
            const res = await getMessages(chatId);
            return res;
          } catch (err) {
            console.log(err);
          }
    };

    useEffect(() => {
        const initialize = async () => {
          const newMessages = await fetchMessages();
          setMessages(
            newMessages.map((msg) => ({
              _id: msg._id,
              text: msg.content,
              createdAt: msg.createdAt,
              user: {
                _id: msg.user._id,
                name: msg.user.username,
                avatar: `http://192.168.1.13:8000/files/${userData.avatar.fileName}`,
              },
            }))
              .reverse()
          );
    
    
        //   socket.current = io(SOCKET_URL);
        };
        initialize();
    }, []);


    const onSend = useCallback(async (messages = []) => {
        if (messages.length > 0) {
            const newMsgObj = messages[0];
            // console.log('faaaaa',newMsgObj)
            try {
              const sendResult = await sendMessage(
                chatId,
                senderId,
                receiverId,
                newMsgObj.text,
              );
            } catch (err) {
              console.log(err);
            }
            setMessages((previousMessages) =>
              GiftedChat.append(previousMessages, messages)
            );
          }
    }, []);

    const onLongPress = (context, message) => {
        const options = ['Copy', 'Delete Message', 'Cancel'];
            const cancelButtonIndex = options.length - 1;
            context.actionSheet().showActionSheetWithOptions({
              options,
              cancelButtonIndex
            }, (buttonIndex) => {
              switch (buttonIndex) {
                case 0:
                  Clipboard.setString(message.text);
                  break;
                case 1:
                  onDelete(message._id) //pass the function here
                  break;
              }
            });
    }

    return (

        <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}>
        <View style={{ flex: 1, paddingTop: 75 }}>
        <GiftedChat
            messages={messages}
            placeholder = 'Tin nhắn'
            showAvatarForEveryMessage={true}
            onSend={messages => onSend(messages)}
            onLongPress={onLongPress}
            user={{
                _id: userId,
            }}         
        /> 
        </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({

    headerLeft: {
        flexDirection: "row",
    },
})
