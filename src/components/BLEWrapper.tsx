import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { RootNavigator } from '../navigation';
import { useAppDispatch } from '../redux/hooks';
import { connect, disconnect } from '../redux/slicers/connectedSlice';
import { setTrue, setFalse } from '../redux/slicers/tryingToConnectSlice';
import { setAllData } from '../redux/slicers/dataSlice';
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
    const [exposeModal, setExposeModal] = useState<boolean>(false);

    const dispatch = useAppDispatch();

    const scanForDevices = () => {
        requestPermissions(isGranted => {
            if (isGranted) {
                scanForPeripherals();
            }
        });
    };

    const closeModal = () => {
        setExposeModal(false);
    }

    const cancelModal = () => {
        setExposeModal(false);
        dispatch(setFalse());
    };

    const openModal = async () => {
        scanForDevices();
    };

    const createData = () => {
        // let data = {flowRate: flowRate, totalFlow: totalFlow, spraySeconds:spraySeconds, startTime:startTime};
        dispatch(setAllData({flowRate: flowRate, totalFlow: totalFlow, spraySeconds:spraySeconds, startTime:startTime, startingFlow: totalFlow, offset: 0}))
        // return data;
    }

    useEffect(() => {
        if (exposeModal) {
            openModal();
        }
    }, [exposeModal]);

    useEffect(() => {
        if (connectedDevice === null) {
            dispatch(disconnect())
        } else {
            dispatch(connect());
        }
    }, [connectedDevice]);

    useEffect(() => {
        createData()
    }, [flowRate]);
    

    return (
        <>
            <RootNavigator exposeModal={exposeModal} 
                setExposeModal={setExposeModal} 
                disconnectFromDevice={disconnectFromDevice} 
                setSpraySeconds={setSpraySeconds}
                />
            <DeviceModal
                closeModal={closeModal}
                cancelModal={cancelModal}
                visible={exposeModal}
                connectToPeripheral={connectToDevice}
                devices={allDevices}
            />
        </>
    );
};

export default BLEWrapper;