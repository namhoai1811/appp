import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View,
  FlatList,
  SafeAreaView,
} from 'react-native';
import {useIsFocused} from '@react-navigation/native';

import ChatRoomItem from '../components/ChatRoomItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiClient from '../api/Client';

export default function HomeChatScreen() {
  const isFocused = useIsFocused();

  const [data, setData] = useState();

  const getListChats = async () => {
    const userToken = await AsyncStorage.getItem('userToken');

    let auth = {
      headers: {
        authorization: 'token ' + userToken,
      },
    };

    try {
      const response = await apiClient.get('chats/getListChats', auth);
      if (response.data) {
        return response.data.data;
      }
    } catch (e) {
      console.log('error when getting data ', e.message);
    }
  };

  useEffect(() => {
    getListChats().then(setData);
  }, [isFocused]);

  return (
    <>
      {data && (
        <SafeAreaView style={styles.page}>
          <FlatList
            data={data}
            keyExtractor={item => `${item._id}`}
            renderItem={({item}) => <ChatRoomItem chatRoom={item} />}
            showsVerticalScrollIndicator={false}
          />
        </SafeAreaView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: 'white',
    flex: 1,
  },
});
