import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/core';
import {Avatar, Icon} from 'react-native-elements';
import {deleteChat} from './api';

export default function MessageSettingScreen() {

  const route = useRoute();
  const navigation = useNavigation();
  const chatId = route.params?.chatId;

  const _onDelete = async () => {
    try {
    //   const deleteChats = await deleteChat(chatId);
      navigation.navigate('HomeChat');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View>
       {/* <Avatar
            rounded
            source={{
              uri: `http://192.168.1.13:8000/files/${userData.avatar.fileName}`,
            }}
          /> */}
      <Text>Block nguoi nay</Text>
      <TouchableOpacity onPress={_onDelete}>
        <Text style={{color: 'red'}}>Xoa cuoc hoi thoai</Text>
      </TouchableOpacity>
    </View>
  );
}
