import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { darkGreen } from '../lib/colors';

interface Props {
    iconType: string,
    action: any,
}

const RoundButton = ({iconType, action}: Props) => {
    return ( 
        <TouchableOpacity
        style={styles.button}
        onPress={action}>
        {/* <Text style={styles.buttonText}>
            Job List
        </Text> */}
        <Icon name={iconType} size={40} color="white" />
    </TouchableOpacity>
     );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: darkGreen,
        justifyContent: 'center',
        alignItems: 'center',
        height: 70,
        width: 70,
        // marginHorizontal: 20,
        marginBottom: 5,
        borderRadius: 35,
    },
});
 
export default RoundButton;