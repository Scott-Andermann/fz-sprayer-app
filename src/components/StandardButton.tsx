import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import { white, darkGreen } from '../lib/colors';

interface Props {
    text: string,
    onPress: any
}

const StandardButton = ({text, onPress}: Props) => {
    return ( 
        <TouchableOpacity
            style={styles.button}
            onPress={onPress}>
            <Text style={styles.buttonText}>{text}</Text>
        </TouchableOpacity>
     );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: darkGreen,
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        marginHorizontal: 20,
        marginBottom: 5,
        borderRadius: 8,
    },
    buttonText: {
        color: white,
        fontSize: 18,
        fontWeight: 'bold'
    }
})
 
export default StandardButton;