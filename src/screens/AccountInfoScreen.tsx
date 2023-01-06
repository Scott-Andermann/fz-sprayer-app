import React from 'react';
import {Text, View, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AccountInfoScreen = () => {

    const storeData = async (value: string) => {
        try {
            await AsyncStorage.setItem('flowzoneName', value)
        } catch (e) {
            console.log(e);
            
        }
        console.log('done');
        
    }

    const getData =async () => {
        try {
            const result = await AsyncStorage.getItem('flowzoneName')
            console.log(result);
            
        } catch (e) {
            
        }
    }

    return ( 
        <View>
            <TouchableOpacity
            style={{backgroundColor: 'white', margin: 10}}
            onPress={() => storeData('Scott')}>
                <Text>Press Here</Text>
            </TouchableOpacity>
            <TouchableOpacity
            style={{backgroundColor: 'white', margin: 10}}
            onPress={getData}>
                <Text>Get Data</Text>
            </TouchableOpacity>
        </View>
     );
}
 
export default AccountInfoScreen;