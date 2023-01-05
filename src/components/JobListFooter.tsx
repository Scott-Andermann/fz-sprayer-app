import React from 'react';
import { Text, View, ActivityIndicator, StyleSheet } from 'react-native';
import { lightGreen } from '../lib/colors';

const JobListFooter = ({end}: {end: boolean}) => {    
    return ( 
        <View style={styles.footerWrapper}>
            <View style={{height: 20}} />
        {end ? 
            <Text>{end ? 'No more results' : 'Loading'}</Text>:
            <ActivityIndicator size='large' color={lightGreen} />
        }
        </View> 
     );
}

const styles = StyleSheet.create({
    footerWrapper: {
        flex: 1,
        width: '100%',
        alignItems: 'center'
    }
})
 
export default JobListFooter;