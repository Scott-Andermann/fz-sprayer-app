import React, { FC, useCallback, useState } from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  Modal,
  SafeAreaView,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import { Device } from 'react-native-ble-plx';
import { darkGreen, gunmetal } from '../lib/colors';


type DeviceModalListItemProps = {
  item: ListRenderItemInfo<Device>;
  connectToPeripheral: (device: Device) => void;
  closeModal: () => void;
};

type DeviceModalProps = {
  devices: Device[];
  visible: boolean;
  connectToPeripheral: (device: Device) => void;
  closeModal: () => void;
  cancelModal: () => void;
};

const DeviceModalListItem: FC<DeviceModalListItemProps> = props => {
  const { item, connectToPeripheral, closeModal } = props;

  const makeConnection = async () => {
    setTimeout(() => connectToPeripheral(item.item), 3000);
  }

  const connectAndCloseModal = useCallback(async () => {
    await makeConnection();
    // connectToPeripheral(item.item);
    await closeModal();
  }, [closeModal, connectToPeripheral, item.item]);  

  return (
    <TouchableOpacity
      onPress={connectAndCloseModal}
      style={modalStyle.ctaButton}>
      <Text style={modalStyle.ctaButtonText}>{item.item.name}</Text>
      {/* <Text style={modalStyle.ctaButtonText}>{item.item.name}</Text> */}
    </TouchableOpacity>
  );
};

const DeviceModal: FC<DeviceModalProps> = props => {
  const { devices, visible, connectToPeripheral, closeModal, cancelModal } = props;


  const renderDeviceModalListItem = useCallback(
    (item: ListRenderItemInfo<Device>) => {
      return (
        <DeviceModalListItem
          item={item}
          connectToPeripheral={connectToPeripheral}
          closeModal={closeModal}
        />
      );
    },
    [closeModal, connectToPeripheral],
  );

  return (
    <Modal
      style={modalStyle.modalContainer}
      animationType="slide"
      transparent={false}
      visible={visible}>
      <SafeAreaView style={modalStyle.modalTitle}>
        <Text style={modalStyle.modalTitleText}>
          Tap on a device to connect
        </Text>
        <FlatList
          contentContainerStyle={modalStyle.modalFlatlistContainer}
          data={devices}
          renderItem={renderDeviceModalListItem}
        />
        <TouchableOpacity
          onPress={cancelModal}
          style={modalStyle.ctaButton}>
          <Text style={modalStyle.ctaButtonText}>Close</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </Modal>
  );
};

const modalStyle = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: gunmetal,
  },
  modalFlatlistContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  modalCellOutline: {
    borderWidth: 1,
    borderColor: 'black',
    alignItems: 'center',
    marginHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 8,
  },
  modalTitle: {
    flex: 1,
    backgroundColor: gunmetal,
  },
  modalTitleText: {
    marginTop: 40,
    fontSize: 30,
    fontWeight: 'bold',
    marginHorizontal: 20,
    textAlign: 'center',
    color: 'white'
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

export default DeviceModal;
