import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import DeviceModal from '../components/DeviceConnectionModal';
import useBLE from '../components/useBLE';

interface IProps {
    exposeModal: boolean,
    setExposeModal?: Dispatch<SetStateAction<boolean>>
}

const ConnectScreen = ({ exposeModal, setExposeModal }: IProps) => {

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.heartRateTitleText}>Connect Screen</Text>
            <TouchableOpacity
                onPress={() => setExposeModal?.(!exposeModal)}
                style={styles.ctaButton}>
                <Text style={styles.ctaButtonText}>
                    {exposeModal}
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2',
    },
    heartRateTitleWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    heartRateTitleText: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        marginHorizontal: 20,
        color: 'black',
    },
    heartRateText: {
        fontSize: 25,
        marginTop: 15,
    },
    ctaButton: {
        backgroundColor: 'purple',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        marginHorizontal: 20,
        marginBottom: 5,
        borderRadius: 8,
    },
    ctaButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
});

export default ConnectScreen;