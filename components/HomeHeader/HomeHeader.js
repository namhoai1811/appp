import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  Text,
  useWindowDimensions,
  Pressable,
} from "react-native";
import Feather from 'react-native-vector-icons/Feather';

// import { Auth, DataStore } from "aws-amplify";
// import { ChatRoom, ChatRoomUser, User } from "../src/models";
// import moment from "moment";
import { useNavigation } from "@react-navigation/core";


const HomeHeader = (props) => {

    // const {width} = useWindowDimensions();
  
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