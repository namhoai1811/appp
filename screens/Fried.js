import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, TouchableOpacity, Button} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiClient from '../api/Client';
import {useRoute, useNavigation} from '@react-navigation/core';

export default function Fried() {
  const [userId, setUserId] = useState();
  const navigation = useNavigation();

  const [data, setdata] = useState();
  const [userData, setuserData] = useState();

  const getUser = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    let userId1 = await AsyncStorage.getItem('userId');
    setUserId(userId1);

    if (chatRoom.member[0] == userId1) userFriend = chatRoom.member[1];
    else userFriend = chatRoom.member[0];

    let auth = {
      headers: {
        authorization: 'token ' + userToken,
      },
    };
    try {
      const response = await apiClient.get(`users/show/${userFriend}`, auth);
      if (response.data) {
        return response.data.data;
      }
    } catch (e) {
      console.log('error when getting data ', e.message);
    }
  };

  const listFriends = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    let userId1 = await AsyncStorage.getItem('userId');
    setUserId(userId1);

    try {
      const response = await apiClient.post(
        '/friends/list',
        {},
        {
          headers: {
            authorization: 'token ' + userToken,
          },
        },
      );
      if (response.status == 200) {
        return response.data.data.friends;
      }

      // }
    } catch (e) {
      console.log('ga', e.message);
    }
  };
  useEffect(() => {
    listFriends().then(setdata);
  }, []);

  const _onChat = item => {
    // useEffect( item => {
    //    getUser(item._id).then(setuserData);
    //   alert(userData);
    // }, []);
    navigation.navigate('ChatRom', {
      chatId: null,
      userData: item,
      userId: userId,
    });
  };
  return (
    <>
      {data && (
        <FlatList
          data={data}
          keyExtractor={item => `${item._id}`}
          renderItem={({item}) => (
            <TouchableOpacity onPress={_onChat(item)}>
              <Text style={{marginTop: 10, color: 'red'}}>{item.username}</Text>
            </TouchableOpacity>
          )}
          showsVerticalScrollIndicator={false}
        />
      )}
    </>
  );
}
