import * as React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import OutlineButton from '../components/OutlineButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Footer from '../components/Footer';

const screenWidth = Dimensions.get('window').width;

const SettingsScreen = ({navigation}: {navigation: any}) => {

    const logout = async () => {
        try {
            await AsyncStorage.removeItem('@token');
            navigation.navigate('Login');

        } catch (e) {
            console.log('error: ', e);
            
        }
    }


    return ( 
        <View style={styles.container}>
            <Text>Settings</Text>
            <OutlineButton text='Log Out' onPress={logout} />
            <Footer screen='settings' navigation={navigation}/>
        </View>
     );
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        flex: 1,
        flexDirection: 'column',
        // alignItems: 'center',
        justifyContent: 'center',
        padding: screenWidth * 0.15,
    },
})
 
export default SettingsScreen;