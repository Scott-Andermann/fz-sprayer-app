import React from 'react';
import { getHeaderTitle } from '@react-navigation/elements';
import { View, Text, StyleSheet } from 'react-native';
import { useAppSelector } from '../redux/hooks';
import { lightGreen } from '../lib/colors';
import Icon from 'react-native-vector-icons/FontAwesome';


const HeaderConnection = ({ title }: { title: string }) => {

    const connected = useAppSelector((state) => state.connected.value)
    const location = useAppSelector((state) => state.location.longitude);

    console.log(location);
    

    return (
        <View style={styles.headerWrapper}>
            <Text style={styles.titleText}>{title}</Text>
            {location === 0 ? 
            <Text>GPS not ready</Text> : 
            <Text>GPS Ready</Text>}
            {connected ?
                <View style={styles.connectedWrapper}>
                    <Text style={{ color: 'white' }}>Connected</Text>
                    <View style={{ ...styles.connectedIndicator, backgroundColor: lightGreen }}>
                        <Icon name='bluetooth-b' color='white' size={28} />
                    </View>
                </View>
                :
                <View style={styles.connectedWrapper}>
                    <Text style={{ color: 'white' }}>No Connection</Text>
                    <View style={{ ...styles.connectedIndicator, backgroundColor: 'red' }}>
                        <Icon name='bluetooth-b' color='white' size={28} />

                    </View>
                </View>

            }
        </View>
    );
}

const styles = StyleSheet.create({
    headerWrapper: {
        flex: 1,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        // marginLeft: 20,
    },
    titleText: {
        fontSize: 26,
        // fontWeight: 'bold',
        color: 'white'
    },
    connectedWrapper: {
        // flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    connectedIndicator: {
        height: 36,
        width: 36,
        marginRight: 10,
        marginLeft: 10,
        borderRadius: 18,
        // borderWidth: 2,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
    },
    disconnectedIndicator: {
        height: 25,
        width: 25,
        marginRight: 10,
        marginLeft: 10,
        backgroundColor: 'red',
        borderRadius: 12.5,
        // borderWidth: 2,
        overflow: 'hidden',
    }
})

export default HeaderConnection;