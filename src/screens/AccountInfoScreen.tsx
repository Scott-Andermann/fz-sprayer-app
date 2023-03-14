import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import InputField from '../components/InputField';
import { darkGreen } from '../lib/colors';
import SelectListComponent from '../components/SelectListComponent';
import ChemicalModal from '../components/ChemicalModal';
import Footer from '../components/Footer';

interface chemicalObject {
    key: number,
    value: string
}

const AccountInfoScreen = ({navigation}: {navigation: any}) => {

    const [name, setName] = useState<string>('');
    const [prefix, setPrefix] = useState<string>('');
    // const [suffix, setSuffix] = useState<string>('');
    const [chemicals, setChemicals] = useState<chemicalObject[]>([]);
    const [newChemical, setNewChemical] = useState<string>('');
    const [modal, setModal] = useState<boolean>(false);

    const storeAccountData = async () => {
        try {
            await AsyncStorage.setItem('flowzoneName', name);
            await AsyncStorage.setItem('flowzonePrefix', prefix);
            // await AsyncStorage.setItem('flowzoneSuffix', suffix);
            await AsyncStorage.setItem('flowzoneChemicals', JSON.stringify(chemicals));
        } catch (e) {
            console.log(e);

        }
        console.log('done');
    }


    const addKeyToArray = (data: string[]) => {
        let dataWithKeys:chemicalObject[] = []
        for(let i = 0; i < data.length; i++) {  
            dataWithKeys.push({key: i, value: data[i]})
        }
        return dataWithKeys
    }

    const getData = async () => {
        try {
            const nameResult = await AsyncStorage.getItem('flowzoneName')
            if (nameResult === null) {
                return;
            }
            setName(nameResult);
            const prefixResult = await AsyncStorage.getItem('flowzonePrefix');
            if (prefixResult === null) {
                return;
            }
            setPrefix(prefixResult)
            const chemicalsResult = await AsyncStorage.getItem('flowzoneChemicals')
            if (chemicalsResult === null) {
                return;
            }
            setChemicals(JSON.parse(chemicalsResult));
        } catch (e) {

        }
    }
    const handleNameChange = (e: string) => {
        setName(e);
    }

    const handlePrefixChange = (e: string) => {
        setPrefix(e);
    }

    useEffect(() => {
        getData()
    }, []);

    console.log(chemicals);
    

    return (
        <View style={styles.container}>
            <InputField 
                text={name} 
                placeholder='Technician Name' 
                onChangeText={handleNameChange} />
            <InputField 
                text={prefix} 
                placeholder='Job Name Prefix' 
                onChangeText={handlePrefixChange} />
            {/* TOOD: put chemicals in a modal */}
            <SelectListComponent data={chemicals} setChemical={setNewChemical}/>
            <TouchableOpacity
                onPress={() => setModal(true)}
                style={styles.ctaButton}>
                <Text style={styles.ctaButtonText}>Manage Chemicals</Text>
            </TouchableOpacity> 
            <TouchableOpacity
                onPress={storeAccountData}
                style={styles.ctaButton}>
                <Text style={styles.ctaButtonText}>Save</Text>
            </TouchableOpacity> 
            <ChemicalModal visible={modal} setVisible={setModal} chemicals={chemicals} setChemicals={setChemicals}/>
            <Footer screen='profile' navigation={navigation}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        height: '100%',
    },
    ctaButton: {
        backgroundColor: darkGreen,
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
})

export default AccountInfoScreen;