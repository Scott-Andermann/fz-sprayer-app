import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const HomeCard = () => {
    return ( 
        <View style={styles.card}>
            <Text></Text>
        </View>
     );
}

const styles = StyleSheet.create({
    card: {
        height: 150,
        width: 120,
        backgroundColor: '#ECECEC',
        margin: 10,
        borderRadius: 20,
    }
})
 
export default HomeCard;