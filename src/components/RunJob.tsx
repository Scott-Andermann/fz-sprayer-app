import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { convertToMins } from '../lib';
import { gunmetal, white } from '../lib/colors';
import { useAppSelector, useAppDispatch } from '../redux/hooks';

interface props {
    totalTime: number,
}

const RunJob = ({totalTime}: props) => {

    const data = useAppSelector((state) => state.data);

    return ( 
        <>
        <View style={styles.titleWrapper}>
            <Text style={styles.titleText}>Flow Rate:</Text>
            <Text style={styles.dataText}>{data.flowRate} LPM</Text>
            <Text style={styles.titleText}>Total Output:</Text>
            {/* TODO: change data.totalFlow to reflect if a new job is started and the unit is not turned off */}
            <Text style={styles.dataText}>{Math.round((data.totalFlow - data.startingFlow) * 100) / 100} Liters</Text> 
            <Text style={styles.titleText}>Time spraying:</Text>
            <Text style={styles.dataText}>{convertToMins(data.spraySeconds - data.offset)} Seconds</Text>
            <Text style={styles.titleText}>Job Length:</Text>
            <Text style={styles.dataText}>{totalTime === 0 ? convertToMins(0) : convertToMins(Math.round(totalTime))} Seconds</Text>
        </View>
    </>
     );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: gunmetal,
    },
    titleWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleText: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        marginHorizontal: 20,
        color: white,
    },
    dataText: {
        fontSize: 25,
        marginTop: 15,
        color: white
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
 
export default RunJob;