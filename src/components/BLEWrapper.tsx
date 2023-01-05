import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { RootNavigator } from '../navigation';
import DeviceModal from './DeviceConnectionModal';
import useBLE from './useBLE';

const BLEWrapper = () => {
    const {
        requestPermissions,
        scanForPeripherals,
        allDevices,
        connectToDevice,
        connectedDevice,
        flowRate,
        totalFlow,
        disconnectFromDevice,
        spraySeconds,
        startTime,
        setSpraySeconds,
    } = useBLE();
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [exposeModal, setExposeModal] = useState<boolean>(false);

    const scanForDevices = () => {
        requestPermissions(isGranted => {
            if (isGranted) {
                scanForPeripherals();
            }
        });
    };

    const closeModal = () => {
        setIsModalVisible(false);
        setExposeModal(false);
    };

    const openModal = async () => {
        scanForDevices();
        setIsModalVisible(true);
    };

    const createData = () => {
        let data = {flowRate: flowRate, totalFlow: totalFlow, spraySeconds:spraySeconds, startTime:startTime};
        return data;
    }

    useEffect(() => {
        if (exposeModal) {
            openModal();
        }
    }, [exposeModal]);

    useEffect(() => {
        
    }, []);

    return (
        <>
            <RootNavigator exposeModal={exposeModal} setExposeModal={setExposeModal} data={createData()} connected={connectedDevice ? true : false} disconnectFromDevice={disconnectFromDevice} setSpraySeconds={setSpraySeconds}/>
            {/* {exposeModal && 
            <TouchableOpacity
                onPress={connectedDevice ? disconnectFromDevice : openModal}
                style={styles.ctaButton}>
                <Text style={styles.ctaButtonText}>
                    {connectedDevice ? 'Disconnect' : 'Connect'}
                </Text>
            </TouchableOpacity>
            } */}
            <DeviceModal
                closeModal={closeModal}
                visible={exposeModal}
                connectToPeripheral={connectToDevice}
                devices={allDevices}
            />
        </>
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

export default BLEWrapper;