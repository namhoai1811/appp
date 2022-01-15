import React, {useEffect, useState} from 'react';
import {View, Image, Text, useWindowDimensions, Pressable} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {getUser} from './api';
import {useRoute, useNavigation} from '@react-navigation/core';

const HomeHeader = props => {
  const [userData, setuserData] = useState();
  const navigation = useNavigation();

  useEffect(() => {
    getUser().then(setuserData);
  }, []);

  const _onPress = () => {
    navigation.navigate('Fried');
  };

  return (
    <>
      {userData && (
        <View
          style={{
          
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
              color: '#333333',
              fontSize: 18,
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
