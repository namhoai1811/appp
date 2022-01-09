import AsyncStorage from '@react-native-async-storage/async-storage';
import apiClient from '../../api/Client';

const getUser = async () => {
  const userToken = await AsyncStorage.getItem('userToken');
  const userId = await AsyncStorage.getItem('userId');

  let auth = {
    headers: {
      authorization: 'token ' + userToken,
    },
  };

  try {
 
    const response = await apiClient.get(`users/show/${userId}`, auth);
    if (response.data) {
      return response.data.data;
    }
  } catch (e) {
    console.log('error when getting data ', e.message);
  }
};

export {getUser};
