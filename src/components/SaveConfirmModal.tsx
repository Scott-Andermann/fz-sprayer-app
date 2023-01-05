import React, {Dispatch, SetStateAction} from 'react';

import {Modal, View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import { darkGreen } from '../lib/colors';


const SaveConfirmModal = ({closeModal, confirmModal, setConfirmModal}: {closeModal: any ,confirmModal: boolean, setConfirmModal: Dispatch<SetStateAction<boolean>>}) => {

    // const closeAll = () => {
    //     setConfirmModal(false);
    //     // setSaveModal(false);
    // }

    return ( 
        <Modal style={styles.container}
            visible={confirmModal}
            transparent={true}>
            <View style={styles.container}>
                <Text>
                    Are you ready to save the job?
                </Text>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => setConfirmModal(false)}>
                    <Text>
                        Go back
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={closeModal}>
                    <Text>
                        Save Job
                    </Text>
                </TouchableOpacity>
            </View>
        </Modal>
     );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
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
})
 
export default SaveConfirmModal;