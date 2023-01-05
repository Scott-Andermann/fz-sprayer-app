import React, {useState, Dispatch, SetStateAction} from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { lightGunmetal, gunmetal, rem, white } from '../lib/colors';

const SaveJobFields = ({description, setDescription}: {description: any, setDescription: Dispatch<SetStateAction<any>>}) => {

    const handleNameChange = (e: {e?: string}) => {
        setDescription(prev => ({...prev, name: e}))
    }
    const handleTechChange = (e: {e?: string}) => {
        setDescription(prev => ({...prev, technician: e}))
    }
    const handleTypeChange = (e: {e?: string}) => {
        setDescription(prev => ({...prev, jobType: e}))
    }
    const handleChemicalChange = (e: {e?: string}) => {
        setDescription(prev => ({...prev, chemical: e}))
    }
    const handleNotesChange = (e: {e?: string}) => {
        setDescription(prev => ({...prev, notes: e}))
    }

    return ( 
        //maybe this needs to be a scroll view?
        <SafeAreaView style={styles.container}>
            <TextInput style={styles.inputField} placeholder='Customer Name' placeholderTextColor={lightGunmetal} value={description.name} onChangeText={handleNameChange}/>
            <TextInput style={styles.inputField} placeholder='Technician' placeholderTextColor={lightGunmetal} onChangeText={handleTechChange}/>
            <TextInput style={styles.inputField} placeholder='Job Type' placeholderTextColor={lightGunmetal} onChangeText={handleTypeChange}/>
            <TextInput style={styles.inputField} placeholder='Chemical' placeholderTextColor={lightGunmetal} onChangeText={handleChemicalChange}/>
            <TextInput style={styles.inputField} 
                placeholder='Notes' 
                placeholderTextColor={lightGunmetal}
                numberOfLines={3}
                onChangeText={handleNotesChange}/>
        </SafeAreaView>
     );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        width: '100%',
        // backgroundColor: gunmetal,
        padding: rem,
        paddingTop: 0.5 * rem,
    },
    inputField: {
        marginTop: 0.5 * rem,
        backgroundColor: white,
        fontSize: 14,
        width: '100%',
        borderRadius: 3,
        paddingLeft: 20,
        paddingTop: 12,
        paddingBottom: 12,
        color: gunmetal,
    }
})
 
export default SaveJobFields;