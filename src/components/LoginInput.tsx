import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, Dimensions, Image, TextInput } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const screenWidth = Dimensions.get('window').width;

const LoginInput = ({type, value, setValue}: {type: string, value: string, setValue: any}) => {
    const iconSize = 24
    const iconColor = 'rgba(190, 190, 190, 1)'

    const [secureTextEntry, setSecureTextEntry] = useState<boolean>(true);

    if (type === 'password') {
        return (
            <View style={{...styles.inputWrapper, justifyContent: 'space-between'}}>
                <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                    <MaterialIcons name='lock-outline' size={iconSize} color={iconColor} style={{paddingLeft: 14, paddingRight: 6}}/>
                    <TextInput onChangeText={setValue} value={value} placeholder='Password' placeholderTextColor={'#FFFFFF'} style={styles.inputField} secureTextEntry={secureTextEntry}/>

                </View>
                <MaterialIcons name='remove-red-eye' size={iconSize} color={iconColor} onPress={() => setSecureTextEntry(!secureTextEntry)} style={{paddingRight: 14}}/>
            </View>
         );
    }
    return (
        <View style={styles.inputWrapper}>
            <MaterialIcons name='person-outline' size={iconSize} color={iconColor} style={{paddingLeft: 14, paddingRight: 6}}/>
            <TextInput onChangeText={setValue} value={value} placeholder='Username/Email' placeholderTextColor={'#FFFFFF'} style={styles.inputField} />
        </View>
     );
}

const styles = StyleSheet.create({
    inputWrapper: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(175, 175, 175, 0.5)',
        width: '100%',
        height: 50,
        borderRadius: 25,
        margin: 6,
    },
    inputField: {
        position: 'relative',
        fontSize: 16,
        color: 'white',
    }
})
 
export default LoginInput;