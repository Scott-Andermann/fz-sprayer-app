import React, { useState, Dispatch, SetStateAction, useEffect } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { lightGunmetal, gunmetal, rem, white } from '../lib/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SelectListComponent from './SelectListComponent';


interface description {
    name: string,
    chemical: string,
    jobType: string,
    notes: string,
    technician: string
}

interface chemicalObject {
    key: number,
    value: string
}

const SaveJobFields = ({ description, setDescription }: { description: description, setDescription: Dispatch<SetStateAction<any>> }) => {

    const [chemicals, setChemicals] = useState<chemicalObject[]>([]);
    const [newChemical, setNewChemical] = useState<string>('');

    const handleNameChange = (e: string) => {
        setDescription((prev: description) => ({ ...prev, name: e }))
    }
    const handleTechChange = (e: string) => {
        setDescription((prev: description) => ({ ...prev, technician: e }))
    }
    const handleTypeChange = (e: string) => {
        setDescription((prev: description) => ({ ...prev, jobType: e }))
    }
    const handleChemicalChange = () => {
        setDescription((prev: description) => ({ ...prev, chemical: newChemical }))
    }
    const handleNotesChange = (e: string) => {
        setDescription((prev: description) => ({ ...prev, notes: e }))
    }


    const autofillFields = async () => {
        const nameResult = await AsyncStorage.getItem('flowzoneName')
        if (nameResult === null) {
            return;
        }
        const prefixResult = await AsyncStorage.getItem('flowzonePrefix');
        if (prefixResult === null) {
            return;
        }
        const chemicalsResult = await AsyncStorage.getItem('flowzoneChemicals')
        if (chemicalsResult === null) {
            return;
        } else {
            setChemicals(JSON.parse(chemicalsResult));
        }

        setDescription((prev: description) => ({ ...prev, name: prefixResult, technician: nameResult }));
    }

    console.log(description);

    useEffect(() => {
        handleChemicalChange()
    }, [newChemical]);


    useEffect(() => {
        autofillFields()
    }, []);



    return (
        //maybe this needs to be a scroll view?
        <SafeAreaView style={styles.container}>
            <TextInput style={styles.inputField}
                placeholder='Customer Name'
                placeholderTextColor={lightGunmetal}
                value={description.name}
                onChangeText={handleNameChange} />
            <TextInput style={styles.inputField}
                placeholder='Technician'
                placeholderTextColor={lightGunmetal}
                value={description.technician}
                onChangeText={handleTechChange} />
            <TextInput style={styles.inputField}
                placeholder='Job Type'
                placeholderTextColor={lightGunmetal}
                onChangeText={handleTypeChange} />
            <SelectListComponent data={chemicals}
                setChemical={setNewChemical} />
            <TextInput style={styles.inputField}
                placeholder='Notes'
                placeholderTextColor={lightGunmetal}
                numberOfLines={3}
                onChangeText={handleNotesChange} />
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