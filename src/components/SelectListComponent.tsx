import React, {useState, useEffect} from 'react';
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

const SelectListComponent = ({data}: {data: object[]}) => {

    const [selected, setSelected] = useState<string>('');

    // const addKeyToDataArray = (data: string[]) => {
    //     for(let i = 0; i < data.length; i++) {  
    //         setDataWithKeys(prev => [...prev, {key: i, value: data[i]}])
    //     }
    // }

    // useEffect(() => {
    //     addKeyToDataArray(data)
    // }, [data]);

    // console.log(dataWithKeys);
    

    return ( 
        <View style={{ width: '100%' }}>
            <SelectList
                boxStyles={styles.dropdown}
                dropdownStyles={styles.dropdownField}
                setSelected={(val: string) => setSelected(val)}
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
    dropdown: {
        marginTop: 0.5 * rem,
        backgroundColor: white,
        borderRadius: 3,
        fontSize: 14,
        paddingTop: 14,
        paddingBottom: 14,
        marginBottom: 8,
        border: 'none'
    },
    dropdownField: {
        backgroundColor: white,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderBottomLeftRadius: 3,
        borderBottomRightRadius: 3,
        marginTop: 0,
        marginBottom: 8,
    }
})
 
export default SelectListComponent;