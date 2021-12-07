import React, {useState} from 'react';
import { 
    View, 
    StyleSheet, 
    TextInput, 
    Pressable, 
    KeyboardAvoidingView, 
    Platform 
} from 'react-native';

import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';

const MessageInput = () => {

    const [message, setMessage ] = useState('');
    

    const _sendMessage = () => {
        alert('send  ' +  message);
        setMessage('');
    }

    const _onPlusClicked = () =>{
        alert('loi');
    }

    const _onPress = () => {
        if (message) {
            _sendMessage();
        } else {
            _onPlusClicked();
        }
    }

    return (
        <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style = {styles.root}
        >
            <View style = {styles.inputContainer}>
                <Feather name='smile' size={24} color='#959595' style={styles.icon}/>

                <TextInput 
                    style= {styles.input}
                    value={message}
                    // onChangeText={(newMessage) => setMessage(newMessage)}
                    onChangeText={setMessage}
                    placeholder="Tin nhắn"
                />
                
                <Feather name='mic' size={24} color='#959595' style={styles.icon}/>
                <Feather name='camera' size={24} color='#959595' style={styles.icon}/>
            </View>
            <Pressable onPress={_onPress} style = {styles.btnContainer}>
                {/* <Text style= {styles.btnText}>+</Text> */}
               {message ? <Ionicons name='send' color='white' size={18}/> :  <Entypo name='plus' color='white' size={24}/>}
            </Pressable>
   
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    root:{
        flexDirection: 'row',
        padding: 10,
    },
    inputContainer: {
        backgroundColor: '#f2f2f2',
        flex: 1,
        marginRight: 10,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: 'lightgrey',
        justifyContent: 'center',
        flexDirection: 'row',
        padding: 5,
    },
    input:{
        flex: 1,
        marginHorizontal: 5,
        // backgroundColor: 'red'
    },
    icon:{
        marginHorizontal: 5,
        paddingTop: 5,
    },
    btnContainer: {
        width: 40,
        height: 40,
        backgroundColor: 'blue',
        borderRadius: 20,
        justifyContent:'center',
        alignItems: 'center',
    },
    btnText: {
        color: 'white',
        fontSize: 35
    }
});

export default MessageInput;
