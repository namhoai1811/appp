import AsyncStorage from '@react-native-async-storage/async-storage';
import apiClient from '../api/Client';
import {Alert} from 'react-native';

const deleteChat = async chatId => {
  const userToken = await AsyncStorage.getItem('userToken');
  try {
    const response = await apiClient.get(
      `/chats/deleteChat/${chatId}`,
      {
        headers: {
          authorization: 'token ' + userToken,
        },
      },
    );
    if (response.status == 200) {
      Alert.alert('Thông báo!', response.data.message, [{text: 'Okay'}]);
    // console.log(response.data.message)
    }
  } catch (e) {
    console.log(e.message);
  }
};

export {deleteChat};
