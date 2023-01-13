import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ActivityIndicator
} from 'react-native';
import RunJob from '../components/RunJob';
import SaveConfirmModal from '../components/SaveConfirmModal';
import SaveJob from '../components/SaveJob';
import { darkGreen, gunmetal } from '../lib/colors';
import Icon from 'react-native-vector-icons/FontAwesome';

interface IProps {
    exposeModal: boolean,
    setExposeModal?: Dispatch<SetStateAction<boolean>>,
    setSpraySeconds?: Dispatch<SetStateAction<number>>,
    data: any,
    connected: boolean,
    disconnectFromDevice: any,
    setTryingToConnect?: Dispatch<SetStateAction<boolean>>,
    tryingToConnect: boolean
}

const NewJobScreen = ({ data, connected, exposeModal, setExposeModal, disconnectFromDevice, setSpraySeconds, setTryingToConnect, tryingToConnect }: IProps) => {
    // const [currentTime, setCurrentTime] = useState<number>(0);
    // const [startTime, setStartTime] = useState<number>(0);
    const [totalTime, setTotalTime] = useState<number>(0);
    const [timeArray, setTimeArray] = useState<number[]>([]);
    const [flowRateArray, setFlowRateArray] = useState<number[]>([]);
    const [startingFlow, setStartingFlow] = useState<number>(data.totalFlow);
    const [totalFlowArray, setTotalFlowArray] = useState<number[]>([]);
    const [started, setStarted] = useState<boolean>(false);
    const [saveModal, setSaveModal] = useState<boolean>(false);
    const [confirmModal, setConfirmModal] = useState<boolean>(false);
    // const [tryingToConnect, setTryingToConnect] = useState<boolean>(false);
    const [description, setDescription] = useState<{ name: string, notes: string, jobType: string, chemical: string, technician: string }>({
        name: '',
        notes: '',
        jobType: '',
        chemical: '',
        technician: ''
    });

    const exposeSaveModal = () => {
        setSaveModal(true);
    }

    const saveJob = async () => {
        // send json to cloud and local storage
        const exportData = {
            description: description,
            totalTime: totalTime,
            time: timeArray,
            flowRate: flowRateArray,
            totalFlow: totalFlowArray,
        }
        // console.log(exportData);

        const response = await fetch('http://localhost:5000/add_data',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ type: 'SAVE', userID: 'user1', data: exportData })
            }
        );
        const result = await response.json();
        console.log('result: ', result);

        setStarted(false);
        setFlowRateArray([]);
        setTimeArray([]);
        setTotalFlowArray([]);
        setTotalTime(0);
        setSaveModal(false);
        setConfirmModal(false);
        setSpraySeconds?.(0);
        setStartingFlow(data.totalFlow);
    }

    const startJob = () => {
        setStartingFlow(data.totalFlow);
        setTimeout(() => setStarted(true), 1000);
    }

    const disconnect = () => {
        disconnectFromDevice();
        setTryingToConnect?.(false);
    }

    const tick = () => {
        if (saveModal || !started) {
            return
        }
        setTotalTime(prev => prev + 1);
    }

    const openConnectionModal = () => {
        setExposeModal?.(!exposeModal)
        setTimeout(() => setTryingToConnect?.(true), 1000)
    }


    useEffect(() => {
        const interval = setInterval(() => {
            tick()
        }, 1000)
        return () => clearInterval(interval);
    }, [saveModal, started]);

    useEffect(() => {
        const time = new Date().getTime();
        setTimeArray(prev => [...prev, time]);
        setFlowRateArray(prev => [...prev, data.flowRate]);
        setTotalFlowArray(prev => [...prev, Math.round((data.totalFlow - startingFlow) * 100) / 100]);
    }, [data]);

    console.log(tryingToConnect);
    

    return (
        <View style={styles.container}>
            {started ?
                <>
                    <RunJob data={data} totalTime={totalTime} startingFlow={startingFlow} />
                    <TouchableOpacity
                        style={styles.ctaButton}
                        onPress={exposeSaveModal}>
                        <Text style={styles.ctaButtonText}>Save Job</Text>
                    </TouchableOpacity>
                </>
                :
                <>
                    {connected ?
                        <>
                            <View style={styles.titleWrapper}>
                                <Text style={styles.titleText}>Job not started</Text>
                            </View>
                            <TouchableOpacity style={styles.ctaButton}
                                onPress={startJob}>
                                <Text style={styles.ctaButtonText}>Start Job</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.ctaButton}
                                onPress={disconnect}>
                                <Text style={styles.ctaButtonText}>Disconnect from sprayer</Text>
                            </TouchableOpacity>
                        </>
                        :
                        <View style={styles.titleWrapper}>
                            {tryingToConnect ?
                                <>
                                    <Text style={styles.titleText}>Connecting...</Text>
                                    <ActivityIndicator size='large' />
                                </>
                                :
                                <>
                                    <Text style={styles.titleText}>Please connect to a sprayer</Text>
                                    <TouchableOpacity style={styles.ctaButton}
                                        onPress={openConnectionModal}>
                                            <Icon name='bluetooth-b' size={30} color='white' />
                                        {/* <Text style={styles.ctaButtonText}>Connect</Text> */}
                                    </TouchableOpacity>
                                </>
                            }
                        </View>
                    }
                </>
            }
            <SaveJob saveModal={saveModal}
                setSaveModal={setSaveModal}
                data={data}
                saveJob={saveJob}
                totalTime={totalTime}
                startingFlow={startingFlow}
                description={description}
                setDescription={setDescription}
                setConfirmModal={setConfirmModal} />
            <SaveConfirmModal confirmModal={confirmModal} closeModal={saveJob} setConfirmModal={setConfirmModal} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: gunmetal,
        justifyContent: 'center'
    },
    titleWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    titleText: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        marginHorizontal: 20,
        color: 'white',
    },
    dataText: {
        fontSize: 25,
        marginTop: 15,
        color: 'black'
    },
    ctaButton: {
        backgroundColor: darkGreen,
        justifyContent: 'center',
        alignItems: 'center',
        // width: '80%',
        height: 70,
        width: 70,
        marginHorizontal: 20,
        marginTop: 20,
        marginBottom: 5,
        borderRadius: 35,
    },
    ctaButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
});

export default NewJobScreen;