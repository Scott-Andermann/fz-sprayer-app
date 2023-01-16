import React, {useState, useEffect, Dispatch, SetStateAction} from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { rem, white, gunmetal, lightGunmetal } from '../lib/colors';
import { SelectList } from 'react-native-dropdown-select-list';

const addChemicalText = ({newChem}: {newChem: string}) => {
    const addChemical = () => {
        console.log('adding chemical');
        
    }
    return (
        <Text onPress={addChemical}>Add New Chemical</Text>
    )
}

const SelectListComponent = ({data, setChemical}: {data: object[], setChemical: Dispatch<SetStateAction<string>>}) => {

    return ( 
        <View style={{ width: '100%' }}>
            <SelectList
                inputStyles={styles.inputStyles}
                boxStyles={styles.dropdown}
                dropdownStyles={styles.dropdownField}
                dropdownTextStyles={styles.dropdownText}
                setSelected={(val: string) => setChemical(val)}
                data={data}
                save='value'
                notFoundText='No matches'
                maxHeight={180}
                placeholder='Chemicals'
                 />
        </View>
     );
}

const styles = StyleSheet.create({
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
    },
    inputStyles: {
        color: gunmetal
    },
    dropdownText: {
        color: gunmetal
    },
    dropdown: {
        marginTop: 0.5 * rem,
        backgroundColor: white,
        borderRadius: 3,
        fontSize: 14,
        paddingTop: 14,
        paddingBottom: 14,
        marginBottom: 8,
        border: 'none',
        color: gunmetal,
    },
    dropdownField: {
        backgroundColor: white,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderBottomLeftRadius: 3,
        borderBottomRightRadius: 3,
        marginTop: 0,
        marginBottom: 8,
        color: gunmetal,
    }
})
 
export default SelectListComponent;