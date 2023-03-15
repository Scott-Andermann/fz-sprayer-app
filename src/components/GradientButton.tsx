import * as React from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const screenWidth = Dimensions.get('window').width;
type asyncVoidFunc = () => Promise<void>;
type voidFunc = () => void;

const GradientButton = ({ text, onPress }: { text: string, onPress: asyncVoidFunc | voidFunc }) => {
    return (
        <TouchableOpacity style={[styles.loginButton, styles.shadowProp]} onPress={onPress}>
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#f6c86b', '#faac7d']} style={[styles.gradient, styles.shadowProp]}>
                <Text style={styles.loginButtonText}>{text}</Text>
            </LinearGradient>
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
        margin: 6
    },
    loginButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
    },
    gradient: {
        height: '100%',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    shadowProp: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.65,
        shadowRadius: 6.27,

        elevation: 10,
    }
})

export default GradientButton;