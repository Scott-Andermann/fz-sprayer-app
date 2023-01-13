import React, { Dispatch, SetStateAction, useState } from 'react';
import { Modal, StyleSheet, View, Text, FlatList } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { darkGreen, gunmetal, white } from '../lib/colors';
import InputField from './InputField';
import StandardButton from './StandardButton';

interface chemicalObject {
    key: number,
    value: string
}

interface Props {
    visible: boolean,
    setVisible: Dispatch<SetStateAction<boolean>>,
    chemicals: chemicalObject[],
    setChemicals: Dispatch<SetStateAction<chemicalObject[]>>,
}

const ListItem = ({ text }: { text: string }) => {
    const [toggleCheckBox, setToggleCheckBox] = useState<boolean>(false)
    return (
        <View style={styles.listItem}>
            <CheckBox
                disabled={false}
                value={toggleCheckBox}
                onValueChange={(newValue) => setToggleCheckBox(newValue)}
            />
            <Text style={styles.listText}>{text}</Text>
        </View>
    )
}

const ChemicalModal = ({ visible, setVisible, chemicals, setChemicals }: Props) => {

    const [newChemical, setNewChemical] = useState<string>('');

    const closeModal = () => {
        setVisible(false);
    }

    const addChemical = () => {
        setChemicals(prev => [...prev, { key: prev.length, value: newChemical }]);
        setNewChemical('');
    }

    const onChangeText = (e: string) => {
        setNewChemical(e)
    }


    return (
        <Modal style={styles.container}
            visible={visible}
            transparent={true}>
            <View style={styles.container}>
                <FlatList
                    data={chemicals}
                    renderItem={({ item }) => <ListItem text={item.value} />}
                />
                <InputField
                    text={newChemical}
                    onChangeText={onChangeText}
                    placeholder='Chemical Name'
                />
                <StandardButton text='Add Chemical' onPress={addChemical} />
                <StandardButton text='Remove Chemical' onPress={addChemical} />
                <StandardButton text='Close' onPress={closeModal} />
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: gunmetal
    },
    button: {
        backgroundColor: darkGreen,
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        marginHorizontal: 20,
        marginBottom: 5,
        borderRadius: 8,
    },
    listText: {
        fontSize: 18,
        color: white,
    },
    listItem: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',

    }
})


export default ChemicalModal;