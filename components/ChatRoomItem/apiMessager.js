
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiClient from '../../api/Client';


const sendMessage = async (chatId, senderId, receiverId, msg) => {
    // console.log('ga',chatId, senderId, receiverId, msg)
    const userToken = await AsyncStorage.getItem('userToken');
    try {
        const response = await apiClient.post('/chats/send',
            {
                receivedId: receiverId,
                chatId: chatId,
                member: [
                    { _id: senderId },
                    { _id: receiverId }
                ],
                content: msg,
                type: "PRIVATE_CHAT"
            },
            {
                headers: {
                    authorization: "token " + userToken,
                }
            }
        );
        if (response.status == 200) {
            console.log(response.data)
            return response.data;
        }
    }
    catch (e) {
        console.log("ga", e.message)
    }
  
  }

const getMessages = async (chatId) => {
    const userToken = await AsyncStorage.getItem('userToken');
    try {
        const response = await apiClient.get(`/chats/getMessages/${chatId}`,
            {
                headers: {
                    authorization: "token " + userToken,
                }
            }
        );
        if (response.status == 200) {
            console.log('chet' ,response.data.data)
            return response.data.data;
        }
    }
    catch (e) {
        console.log("ga", e.message)
    }

}

// const sendMessage = async (chatId, senderId, receiverId, msg, token) => {
//     const newMessage = {
//         receivedId: receiverId,
//         chatId: chatId,
//         member: [
//             { _id: senderId },
//             { _id: receiverId }
//         ],
//         content: msg,
//         type: "PRIVATE_CHAT"
//     };


//     const sendResult = await api({
//         method: 'POST',
//         url: '/chats/send/',
//         data: newMessage,
//         headers: {
//             'Authorization': `Bearer ${token}`
//         }
//     });

//     return sendResult;
// }

// const deleteMessage = async (messageId, token) => {
//     const getResult = await api({
//         method: 'GET',
//         url: `/chats/deleteMess/${messageId}`,
//         headers: {
//             'Authorization': `Bearer ${token}`
//         }
//     });
//     return getResult;
// }

export {getMessages, sendMessage};