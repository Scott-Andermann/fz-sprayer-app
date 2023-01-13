import React, {useState} from 'react';
import {
    Button,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image,
    Linking,
    Alert,
} from 'react-native';
import SaveConfirmModal from '../components/SaveConfirmModal';
import { darkGreen, gunmetal } from '../lib/colors';
// import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
// import {faMugSaucer} from '@fortawesome/free-solid-svg-icons';
import Icon from 'react-native-vector-icons/FontAwesome';

const Home = ({ navigation }:{navigation: any}) => {

    const url = 'https://fzspray.com/'

    const openStoreLink = async () => {
        try {
            await Linking.openURL(url);
        } catch {
            Alert.alert('Error: webpage not responding, please visit fzspray.com for store details')
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image 
                    style={styles.mainImage}
                    source={require('../assets/fzlogo.png')} />
            </View>
            <View style={styles.spacer}></View>
            <View style={styles.buttonContainer}>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('Job')}>
                    {/* <Text style={styles.buttonText}>
                        New Job
                    </Text> */}
                    <Icon name="shower" size={40} color="white" />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('History')}>
                    {/* <Text style={styles.buttonText}>
                        Job List
                    </Text> */}
                    <Icon name="list-ul" size={40} color="white" />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('Account')}>
                        <Icon name="user" size={40} color="white" />
                    {/* <Text style={styles.buttonText}>
                        Account Info
                    </Text> */}
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={openStoreLink}>
                        <Icon name="shopping-cart" size={40} color="white" />
                    {/* <Text style={styles.buttonText}>
                        Account Info
                    </Text> */}
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: gunmetal,
        height: '100%',
        flex: 1,
        flexDirection: 'column',
        // alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        // width: '100%',
        // marginHorizontal: 30
    },
    button: {
        backgroundColor: darkGreen,
        justifyContent: 'center',
        alignItems: 'center',
        height: 70,
        width: 70,
        // marginHorizontal: 20,
        marginBottom: 5,
        borderRadius: 35,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
    mainImage: {
        width: '90%',
        height: 200,
        resizeMode: 'center',
    },
    imageContainer: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    spacer: {
        height: 100
    },
    iconStyle: {
        color: 'white',
    }
})

export default Home;