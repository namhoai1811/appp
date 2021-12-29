import React, {useEffect, useState} from 'react';
import {View, Image, Text, useWindowDimensions, Pressable} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiClient from '../../api/Client';
import {getUser} from './api';

const HomeHeader = props => {
  const [userData, setuserData] = useState();

  useEffect(() => {
    getUser().then(setuserData);
  }, []);

  const userId = AsyncStorage.getItem('userId');
  const listFriends = async () => {
    const userToken = await AsyncStorage.getItem('userToken');

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
        console.log(response.data.data.friends);
        return response.data.data.friends;
      }

      // }
    } catch (e) {
      console.log('ga', e.message);
    }
  };

  const _onPress = () => {
    // listFriends();
    // console.log(userId._W)
  };

  return (
    <>
      {userData && (
        <View
          style={{
            // backgroundColor: 'red',
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '98%',
            padding: 10,
            alignItems: 'center',
          }}>
          <Image
            source={{
              uri: `http://192.168.1.13:8000/files/${userData.avatar.fileName}`,
            }}
            style={{width: 30, height: 30, borderRadius: 30}}
          />

          <Text
            style={{
              flex: 1,
              marginLeft: 10,
              textAlign: 'center',
              fontWeight: 'bold',
            }}>
            Chat
          </Text>

          <Feather
            name="plus"
            size={24}
            color="black"
            style={{marginHorizontal: 10}}
            onPress={_onPress}
          />
        </View>
      )}
    </>
  );
};

export default HomeHeader;
