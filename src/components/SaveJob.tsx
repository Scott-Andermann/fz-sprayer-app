import React, { useState, Dispatch, SetStateAction } from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  Modal,
  SafeAreaView,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import { darkGreen, gunmetal } from '../lib/colors';
import RunJob from './RunJob';
import SaveJobFields from './SaveJobFields';


interface props {
  saveModal: boolean,
  setSaveModal: Dispatch<SetStateAction<boolean>>,
  data: any,
  saveJob: any,
  totalTime: number,
  startingFlow: number,
  description: any,
  setDescription: Dispatch<SetStateAction<any>>,
  setConfirmModal: Dispatch<SetStateAction<boolean>>,
}

const SaveJob = ({ saveModal, setSaveModal, data, saveJob, totalTime, startingFlow, description, setDescription, setConfirmModal }: props) => {

  // const [confirmModal, setConfirmModal] = useState<boolean>(false);

  return (
    <Modal
      style={modalStyle.modalContainer}
      animationType="slide"
      transparent={false}
      visible={saveModal}>
      <ScrollView style={modalStyle.modalContainer}>
        <SafeAreaView style={modalStyle.dataContainer}>
          <SaveJobFields description={description} setDescription={setDescription} />
          <RunJob data={data} totalTime={totalTime} startingFlow={startingFlow} />
        </SafeAreaView>
        <TouchableOpacity
          onPress={() => setConfirmModal(true)}
          style={modalStyle.ctaButton}>
          <Text style={modalStyle.ctaButtonText}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSaveModal(false)}
          style={modalStyle.ctaButton}>
          <Text style={modalStyle.ctaButtonText}>Back</Text>
        </TouchableOpacity>
      </ScrollView>
    </Modal>
  );
}

const modalStyle = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: gunmetal,
  },
  dataContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  modalCellOutline: {
    borderWidth: 1,
    borderColor: 'black',
    alignItems: 'center',
    marginHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 8,
  },
  modalTitleText: {
    marginTop: 40,
    fontSize: 30,
    fontWeight: 'bold',
    marginHorizontal: 20,
    textAlign: 'center',
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
});

export default SaveJob;