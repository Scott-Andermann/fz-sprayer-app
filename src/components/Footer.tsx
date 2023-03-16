import React, {useState} from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { lightGreen, darkGreen } from '../lib/colors';
// import Icon from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const Footer = ({screen, navigation}: {screen: string, navigation: any}) => {

    const iconSize = 22
    return (
        <View style={styles.footerWrapper}>
        <View style={styles.footerContainer}>
            <TouchableOpacity style={[styles.navButton, {backgroundColor: screen === 'home' ? lightGreen : darkGreen}, screen === 'home' && styles.shadowProp]} onPress={() => navigation.navigate('Home')}>
                <Ionicons name='home-sharp' size={iconSize} color={screen === 'home' ? darkGreen : 'white'} />
                <Text style={{...styles.navButtonText, color: screen === 'home' ? darkGreen : 'white'}}>HOME</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.navButton, {backgroundColor: screen === 'history' ? lightGreen : darkGreen}, screen === 'history' && styles.shadowProp]} onPress={() => navigation.navigate('History')}>
                <FontAwesome5 name='calendar-day' size={iconSize} color='white' />
                <Text style={styles.navButtonText}>HISTORY</Text>
            </TouchableOpacity>
            <View style={styles.placeholder}></View>
            <TouchableOpacity style={[styles.navButton, {backgroundColor: screen === 'profile' ? lightGreen : darkGreen}, screen === 'profile' && styles.shadowProp]} onPress={() => navigation.navigate('Account')}>
                <Ionicons name='md-person-sharp' size={iconSize} color='white' />
                <Text style={styles.navButtonText}>PROFILE</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.navButton, {backgroundColor: screen === 'settings' ? lightGreen : darkGreen}, screen === 'settings' && styles.shadowProp]} onPress={() => navigation.navigate('Settings')}>
                <Ionicons name='settings-sharp' size={iconSize} color='white' />
                <Text style={styles.navButtonText}>SETTINGS</Text>
            </TouchableOpacity>
        </View>
        <View style={[{backgroundColor: lightGreen, borderRadius: 45}, styles.shadowProp]}>
            <TouchableOpacity style={styles.newJobButton} onPress={() => navigation.navigate('Job')}>
                <Icon name={'plus-a'} size={38} color={lightGreen} />
                <Text style={styles.newJobButtonText}>NEW</Text>
            </TouchableOpacity>
        </View>
        </View>
    );
}

const styles = StyleSheet.create({
    footerWrapper: {
        height: 120,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    footerContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 60,
        backgroundColor: darkGreen,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        zIndex: 0,
    },
    newJobButton: {
        // position: 'absolute',
        height: 90,
        width: 90,
        borderRadius: 45,
        backgroundColor: 'white',
        zIndex: 10,
        color: lightGreen,
        fontSize: 20,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 0,
    },
    placeholder: {
        width: 90,
        height: 90,
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
        width: 70,
    },
    navButtonText: {
        color: 'white',
        fontSize: 12,
        letterSpacing: -0.5
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

export default Footer;