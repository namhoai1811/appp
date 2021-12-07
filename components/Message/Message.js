import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const blue = 'blue';
const grey = 'grey';

const myID = 'u1';

const  Message = ({ message }) => {

    const isMe = message.user.id === myID;
    
    return (
        <View style = {[styles.container , isMe ? styles.leftContainer : styles.rightContainer]}
        >
            <Text style= {{ color: isMe ? 'black' : 'white'}}>{message.content}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'blue',
        padding:10,
        margin: 10,
        borderRadius: 10,
        maxWidth: '75%',
    },
    leftContainer: {
        backgroundColor: blue,
        marginLeft: 10,
        marginRight: 'auto',

    },
    rightContainer: {
        backgroundColor: grey,
        marginLeft: 'auto',
        marginRight: 10,
    }
});

export default Message;
