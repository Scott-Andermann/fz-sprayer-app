import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { white } from '../lib/colors';

const JobInfoField = ({ titleText, value }: { titleText: string, value: string | number }) => {
    if (titleText === 'Output') {
        return (
            <View>
                <Text style={styles.jobInfoHeading}>{titleText}</Text>
                <Text style={styles.jobInfoData}>{`${value} L`}</Text>
            </View>
        );

    }
    else if (titleText === 'Time') {
        return (
            <View>
                <Text style={styles.jobInfoHeading}>{titleText}</Text>
                <Text style={styles.jobInfoData}>{`${value}`}</Text>
            </View>
        );
    }
    else if (titleText === 'Date') {
        const d = new Date(value);

        return (
            <View>
                <Text style={styles.jobInfoData}>{`${d.getMonth()+1}/${d.getDate()}/${d.getFullYear()}`}</Text>
            </View>
        );
    }
    else if (titleText === 'Chemical') {
        return (
            <View>
                <Text style={styles.jobInfoHeading}>{titleText}</Text>
                <Text style={styles.jobInfoData}>{`${value}`}</Text>
            </View>
        );
    }
    else if (titleText === 'Type') {
        return (
            <View>
                <Text style={styles.jobInfoHeading}>{titleText}</Text>
                <Text style={styles.jobInfoData}>{`${value}`}</Text>
            </View>
        );
    }
    else {
        return (
            <View>
                <Text>Error! Invalid data type</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    jobInfoHeading: {
        fontSize: 12,
        color: white,
    },
    jobInfoData: {
        color: white,
        fontSize: 16,
        paddingLeft: 10,
        // fontWeight: 'bold',

    }
})

export default JobInfoField;