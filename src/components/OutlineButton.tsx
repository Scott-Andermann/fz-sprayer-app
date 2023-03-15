import * as React from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, Text } from 'react-native';

const screenWidth = Dimensions.get('window').width;
type asyncVoidFunc = () => Promise<void>;
type voidFunc = () => void;

const OutlineButton = ({ text, onPress }: { text: string, onPress: asyncVoidFunc | voidFunc }) => {
    return (
        <TouchableOpacity style={styles.loginButton} onPress={onPress}>
                <Text style={styles.loginButtonText}>{text}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    loginButton: {
        width: screenWidth * 0.7,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        borderRadius: 25,
        overflow: 'hidden',
        margin: 6,
        backgroundColor: 'transparent',
        borderColor: 'gray',
        borderWidth: 2,
    },
    loginButtonText: {
        color: 'white',
        fontWeight: 'normal',
        fontSize: 20,
    },
})

export default OutlineButton;