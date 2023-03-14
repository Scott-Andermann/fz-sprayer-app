import React, {useState} from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { lightGreen, darkGreen } from '../lib/colors';
// import Icon from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const Footer = ({screen, navigation}: {screen: string, navigation: any}) => {

    const iconSize = 28
    return (
        <View style={styles.footerContainer}>
            <TouchableOpacity style={{...styles.navButton, backgroundColor: screen === 'home' ? lightGreen : darkGreen}} onPress={() => navigation.navigate('Home')}>
                <Ionicons name='home-sharp' size={iconSize} color={screen === 'home' ? darkGreen : 'white'} />
                <Text style={{...styles.navButtonText, color: screen === 'home' ? darkGreen : 'white'}}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{...styles.navButton, backgroundColor: screen === 'history' ? lightGreen : darkGreen}} onPress={() => navigation.navigate('History')}>
                <FontAwesome5 name='calendar-day' size={iconSize} color='white' />
                <Text style={styles.navButtonText}>History</Text>
            </TouchableOpacity>
            <View></View>
            <TouchableOpacity style={styles.newJobButton} onPress={() => navigation.navigate('Job')}>
                <Icon name={'plus-a'} size={38} color={lightGreen} />
                <Text style={styles.newJobButtonText}>NEW</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{...styles.navButton, backgroundColor: screen === 'profile' ? lightGreen : darkGreen}} onPress={() => navigation.navigate('Account')}>
                <Ionicons name='md-person-sharp' size={iconSize} color='white' />
                <Text style={styles.navButtonText}>Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{...styles.navButton, backgroundColor: screen === 'settings' ? lightGreen : darkGreen}} onPress={() => navigation.navigate('Home')}>
                <Ionicons name='settings-sharp' size={iconSize} color='white' />
                <Text style={styles.navButtonText}>Settings</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    footerContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 80,
        backgroundColor: darkGreen,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    newJobButton: {
        // position: 'absolute',
        height: 90,
        width: 90,
        borderRadius: 45,
        backgroundColor: 'white',
        top: -40,
        left: 0,
        zIndex: 1,
        color: lightGreen,
        fontSize: 20,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 0,
    },
    newJobButtonText: {
        color: lightGreen,
        fontSize: 18,
        // fontWeight: 'bold',
        marginBottom: 4
    },
    navButton: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
        height: '100%',
    },
    navButtonText: {
        color: 'white',
        fontSize: 16,
    }
})

export default Footer;