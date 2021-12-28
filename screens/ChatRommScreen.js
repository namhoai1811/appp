import React, {useLayoutEffect} from 'react';
import { Text, View, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/core';
import { Avatar, Icon } from "react-native-elements";

import Message from '../components/Message';

import chatRoomData from '../assets/dummy-data/Chats';
import MessageInput from '../components/MessageInput';

export default function ChatRommScreen() {

    const route = useRoute();
    const navigation = useNavigation();

    // alert(route.params?._id);

    useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <View style={styles.headerLeft}>
          <Icon name={"chevron-left"} size={40} onPress={() => {navigation.navigate("HomeChat")}} />
          <Avatar rounded source={{uri : "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/vadim.jpg"}} />
        </View>
      ),
      title: ' Nam',
      headerRight: () => <View><Icon name={"menu"} size={40} /></View>,
    });
    }, []);
 
    return (
        <SafeAreaView style = {styles.page}>
            <View style={styles.list1}>
                <FlatList 
                data = {chatRoomData.messages}
                renderItem= {({ item }) => <Message message={item}/>}
                inverted
             />
            </View>

            <View style={styles.list2}>
                <MessageInput  />
            </View> 

        </SafeAreaView> 
    );
}

const styles = StyleSheet.create({
    page: {
        flex:1,
    },
    list1: {
        height: '90%'
    },
    list2: {
        height: '10%'
    },
    headerLeft: {
        flexDirection: "row",
    },
})
