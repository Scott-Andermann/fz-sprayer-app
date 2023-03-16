import React, { useState, useEffect } from 'react';
import { RootNavigator } from '../navigation';
import { useAppDispatch } from '../redux/hooks';
import { connect, disconnect } from '../redux/slicers/connectedSlice';
import { setTrue, setFalse } from '../redux/slicers/tryingToConnectSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setAllData } from '../redux/slicers/dataSlice';
import DeviceModal from './DeviceModal';
import useBLE from './useBLE';
import Location from './Location';


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
    const [token, setToken] = useState<string>('')
    const [initialRoute, setInitialRoute] = useState<string | null>(null);


    const dispatch = useAppDispatch();

    const scanForDevices = () => {
        requestPermissions(isGranted => {
            if (isGranted) {
                scanForPeripherals();
            }
        });
    };

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
        const getToken = async () => {
            try {
                const value = await AsyncStorage.getItem('@token');
                if (value !== null) {
                    setToken(value);
                    setInitialRoute('Home');
                } else {
                    setInitialRoute('Login');
                }
            }
            catch (e) {
                console.log('error requesting token: ', e);
                
            }
        }
        getToken()
    }, []);

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
            <Location requestPermissions={requestPermissions} />
            <RootNavigator exposeModal={exposeModal} 
                setExposeModal={setExposeModal} 
                disconnectFromDevice={disconnectFromDevice} 
                setSpraySeconds={setSpraySeconds}
                token={token}
                initialRoute={initialRoute}
                />
            <DeviceModal
                closeModal={cancelModal}
                cancelModal={cancelModal}
                visible={exposeModal}
                connectToPeripheral={connectToDevice}
                devices={allDevices}
            />
        </>
    );
};

export default BLEWrapper;