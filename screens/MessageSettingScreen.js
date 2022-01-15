import React, {useState, useEffect, useRef} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/core';
import {Avatar} from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiClient from '../api/client';
import {Alert} from 'react-native';

import {useIsFocused} from '@react-navigation/native';

import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {io} from 'socket.io-client';
const SOCKET_URL = 'http://192.168.1.13:3000';

export default function MessageSettingScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const chatId = route.params?.chatId;
  const userData = route.params?.userData;
  const receiverId = userData._id;

  const [block, setblock] = useState(false);
  const [state, setState] = useState({});

  const socket = useRef();

  useEffect(() => {
    const initialize = async () => {
      const listBlocks = await listBlock();
      for (let i = 0; i < listBlocks.length; i++) {
        if (listBlocks[i]._id == receiverId) {
          setblock(true);
        }
      }
    };
    initialize();
    return () => {
      setState({}); // This worked for me
    };
  }, []);

  const deleteChat = async chatId => {
    const userToken = await AsyncStorage.getItem('userToken');
    try {
      const response = await apiClient.get(`/chats/deleteChat/${chatId}`, {
        headers: {
          authorization: 'token ' + userToken,
        },
      });
      if (response.status == 200) {
        Alert.alert('Thông báo!', response.data.message, [{text: 'Okay'}]);
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  const _onDelete = async () => {
    try {
      const deleteChats = await deleteChat(chatId);
      navigation.navigate('HomeChat');
    } catch (err) {
      console.log(err);
    }
  };

  const listBlock = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    try {
      const response = await apiClient.get(
        '/users/list-block',

        {
          headers: {
            authorization: 'token ' + userToken,
          },
        },
      );
      if (response.status == 200) {
        return response.data.data;
      }
    } catch (e) {
      console.log('ga', e.message);
    }
  };

  const _onBlock = async () => {
    try {
      socket.current = io.connect(SOCKET_URL);
      _setBlock().then(() => {
        socket.current?.emit('block', {
          receiverId: receiverId,
        });
      });
    } catch (err) {
      console.log(err);
    }
  };

  const _setBlock = async type => {
    type = '1';
    if (block) type = null;
    const userToken = await AsyncStorage.getItem('userToken');
    try {
      const res = await apiClient.post(
        '/users/set-block-diary',
        {
          user_id: userData._id,
          type: type,
        },
        {
          headers: {
            authorization: 'token ' + userToken,
          },
        },
      );
      setblock(!block);
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          alignItems: 'center',
          margin: 20,
        }}>
        <Avatar
          rounded
          size={100}
          source={{
            uri: `http://192.168.1.13:8000/files/${userData.avatar.fileName}`,
          }}
        />
      </View>

      <Text
        style={{
          textAlign: 'center',
          fontSize: 24,
          fontWeight: 'bold',
          color: 'black',
          margin: 5,
        }}>
        {userData.username}
      </Text>

      <View style={{marginTop: 40}}>
        <View style={[styles.item]}>
          <AntDesign style={styles.icon} name="user" size={20} color="black" />
          <Text style={[styles.text]}>Trang cá nhân </Text>
        </View>
        <TouchableOpacity onPress={_onDelete}>
          <View style={[styles.item]}>
            <FontAwesome
              style={styles.icon}
              name="trash"
              size={20}
              color="black"
            />
            <Text style={[styles.text]}>Xóa toàn bộ tin nhắn </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={_onBlock}>
          <View style={[styles.item]}>
            <Entypo style={styles.icon} name="block" size={20} color="black" />
            {block ? (
              <Text style={[styles.text]}>Bỏ chặn người dùng này </Text>
            ) : (
              <Text style={[styles.text]}>Chặn người dùng này </Text>
            )}
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F1F1',
  },
  text: {
    color: 'black',
    marginLeft: 10,
    fontSize: 20,
    paddingTop: 5,
  },
  item: {
    margin: 4,
    flexDirection: 'row',
    height: 40,
    backgroundColor: '#ffffff',
  },
  icon: {
    paddingLeft: 20,
    paddingTop: 8,
  },
});
