import React, {useState} from 'react';
import {
    Button,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image,
} from 'react-native';
import SaveConfirmModal from '../components/SaveConfirmModal';
import { darkGreen, gunmetal } from '../lib/colors';

import { scratch } from '../lib/scratch';


const Home = ({ navigation }:{navigation: any}) => {

    const getAPI = async () => {
        // const response = await fetch('https://9v3kw6g7hj.execute-api.us-east-1.amazonaws.com/default/fz_server');
        const response = await fetch('http://localhost:5000/');
        const result = await response.json();
        console.log('result: ', result);
        
    }


    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image 
                    style={styles.mainImage}
                    source={require('../assets/fzlogo.png')} />
            </View>
            <View style={styles.spacer}></View>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('New Job')}>
                <Text style={styles.buttonText}>
                    New Job
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Job List')}>
                <Text style={styles.buttonText}>
                    Job List
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Defaults')}>
                <Text style={styles.buttonText}>
                    Set Defaults
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: gunmetal,
        height: '100%',
        flex: 1,
        justifyContent: 'center'
    },
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
        alignItems: 'center'
    },
    spacer: {
        height: 100
    }
})

export default Home;