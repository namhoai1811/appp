import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  Text,
  useWindowDimensions,
  Pressable,
} from "react-native";
import Feather from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiClient from '../../api/Client';

// import { Auth, DataStore } from "aws-amplify";
// import { ChatRoom, ChatRoomUser, User } from "../src/models";
// import moment from "moment";
import { useNavigation } from "@react-navigation/core";


const HomeHeader = (props) => {

    // const {width} = useWindowDimensions();
    const userId =  AsyncStorage.getItem('userId');
    const listFriends = async () => {
      const userToken = await AsyncStorage.getItem('userToken');
     
      try {
          const response = await apiClient.post('/friends/list',
              {

              },
              {
                  headers: {
                      authorization: "token " + userToken,
                  }
              }
          );
          if (response.status == 200) {
              console.log(response.data.data.friends)
              return response.data.data.friends;
          }

          // }
      }
      catch (e) {
          console.log("ga", e.message)
      }
    }

    
    const sendMessage = async (
      // chatId, senderId, receiverId, msg, token
      ) => {
      const newMessage = {
          
      };

      const userToken = await AsyncStorage.getItem('userToken');
      try {
          const response = await apiClient.post('/chats/send',
              {
                receivedId: '61c2e6405279bf14d06269a9',
                chatId: null,
                member: [
                    { _id: '61caaf7a83f29e4524fd668c' },
                    { _id: '61c2e6405279bf14d06269a9' }
                ],
                content: 'bbbbbb',
                type: "PRIVATE_CHAT"
              },
              {
                  headers: {
                      authorization: "token " + userToken,
                  }
              }
          );
          if (response.status == 200) {
              console.log(response.data)
              return response.data;
          }

          // }
      }
      catch (e) {
          console.log("ga", e.message)
      }
    
    }

    

    const _onPress = () => {
      // listFriends();
      // sendMessage();
      console.log(userId._W)
    }

  
    return (
      <View
        style={{
          // backgroundColor: 'red',
          flexDirection: "row",
          justifyContent: "space-between",
          width:'98%',
          padding: 10,
          alignItems: "center",
        }}
      >
        <Image
          source={{
            uri: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/elon.png',
          }}
          style={{ width: 30, height: 30, borderRadius: 30 }}
        />
  
        {/* <Pressable onPress={openInfo} style={{ flex: 1, marginLeft: 10 }}>
          <Text style={{ fontWeight: "bold" }}>
            {chatRoom?.name || user?.name}
          </Text>
          <Text numberOfLines={1}>
            {isGroup ? getUsernames() : getLastOnlineText()}
          </Text>
        </Pressable> */}
  
        <Text style={{ 
            flex: 1, 
            marginLeft: 10, 
            textAlign: "center",
            fontWeight: "bold",
            }}
        > 
            Chat 
        </Text>
  
        <Feather
          name="plus"
          size={24}
          color="black"
          style={{ marginHorizontal: 10 }}
          onPress={_onPress}
        />

        {/* <Feather
          name="video"
          size={24}
          color="black"
          style={{ marginHorizontal: 10 }}
        /> */}
      </View>
    );
  };
  
  export default HomeHeader;