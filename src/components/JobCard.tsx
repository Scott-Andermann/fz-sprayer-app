import React, { useState } from 'react';
import { Text, View, Dimensions, StyleSheet, processColor } from 'react-native';
// import {
//     LineChart
// } from 'react-native-chart-kit';
import { LineChart } from 'react-native-charts-wrapper';
import { red, lightGunmetal, darkGreen, lightGreen, whiteTransparent } from '../lib/colors';
import JobInfoField from './JobInfoField';
import SummaryLineChart from './SummaryLineChart';


interface description {
    name: string,
    chemical: string,
    jobType: string,
    notes: string
}

interface props {
    timeArray: Array<string>,
    totalFlow: Array<number>,
    description: description,
    totalTime: string,
    startTime: number
}

const JobCard = ({ timeArray, totalFlow, description, totalTime, startTime }: props) => {

    return (
        <View style={styles.cardContainer}>
            <Text style={styles.titleText}>{description['name']}</Text>
            <View style={styles.cardWrapper}>

                <View style={styles.tableWrapper}>
                    <JobInfoField titleText='Date' value={startTime} />
                    <JobInfoField titleText='Time' value={totalTime} />
                    <JobInfoField titleText='Output' value={totalFlow[totalFlow.length - 1]} />
                    {description.chemical.length > 1 && <JobInfoField titleText='Chemical' value={description.chemical} />}
                </View>
                <View style={styles.chartWrapper}>
                    <SummaryLineChart
                        timeArray={timeArray}
                        totalFlow={totalFlow}
                    />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    cardContainer: {
        flex: 1,
        margin: 10,
        backgroundColor: lightGunmetal,
        borderRadius: 10,
        padding: 10,
        paddingLeft: 20,
        paddingTop: 20
    },
    cardWrapper: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        // justifyContent: 'center'
    },
    titleText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    chartWrapper: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        paddingRight: 0,
        height: 220,
        width: '60%',
    },
    tableWrapper: {
        flex: 1,
        width: '40%',
        height: '100%',
    },
})

export default JobCard;