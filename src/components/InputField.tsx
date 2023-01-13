import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { rem, white, gunmetal, lightGunmetal } from '../lib/colors';

const InputField = ({text, onChangeText, placeholder}: {text: string, onChangeText: any, placeholder: string}) => {
    return ( 
        <TextInput style={styles.inputField} placeholder={placeholder} placeholderTextColor={lightGunmetal} value={text} onChangeText={onChangeText}/>
     );
}

const styles = StyleSheet.create({
    inputField: {
        marginTop: 0.5 * rem,
        backgroundColor: white,
        fontSize: 14,
        width: '100%',
        borderRadius: 3,
        paddingLeft: 20,
        paddingTop: 12,
        paddingBottom: 12,
        color: gunmetal,
    }
})
 
export default InputField;