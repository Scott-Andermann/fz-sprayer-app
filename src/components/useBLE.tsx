/* eslint-disable no-bitwise */
import { useState, Dispatch, SetStateAction } from 'react';
import { PermissionsAndroid, Platform } from 'react-native';
import {
  BleError,
  BleManager,
  Characteristic,
  Device,
} from 'react-native-ble-plx';
import { PERMISSIONS, requestMultiple } from 'react-native-permissions';
import DeviceInfo from 'react-native-device-info';

import { atob } from 'react-native-quick-base64';

import { setFalse } from '../redux/slicers/tryingToConnectSlice';
import { useAppDispatch } from '../redux/hooks';

const bleManager = new BleManager();

type VoidCallback = (result: boolean) => void;

interface BluetoothLowEnergyApi {
  requestPermissions(cb: VoidCallback): Promise<void>;
  scanForPeripherals(): void;
  connectToDevice: (deviceId: Device) => Promise<void>;
  disconnectFromDevice: () => void;
  connectedDevice: Device | null;
  allDevices: Device[];
  flowRate: number;
  totalFlow: number;
  spraySeconds: number;
  startTime: number;
  setSpraySeconds: Dispatch<SetStateAction<number>>;
}

function useBLE(): BluetoothLowEnergyApi {
  const [allDevices, setAllDevices] = useState<Device[]>([]);
  const [connectedDevice, setConnectedDevice] = useState<Device | null>(null);
  const [flowRate, setFlowRate] = useState<number>(0);
  const [totalFlow, setTotalFlow] = useState<number>(0);
  const [spraySeconds, setSpraySeconds] = useState<number>(0);
  const [startTime, setStartTime] = useState<number>(0);

  const dispatch = useAppDispatch()

  const requestPermissions = async (cb: VoidCallback) => {
    if (Platform.OS === 'android') {
      const apiLevel = await DeviceInfo.getApiLevel();

      if (apiLevel < 31) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'Bluetooth Low Energy requires Location',
            buttonNeutral: 'Ask Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        console.log(granted);
        
        cb(granted === PermissionsAndroid.RESULTS.GRANTED);
      } else {
        const result = await requestMultiple([
          PERMISSIONS.ANDROID.BLUETOOTH_SCAN,
          PERMISSIONS.ANDROID.BLUETOOTH_CONNECT,
          PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        ]);

        const isGranted =
          result['android.permission.BLUETOOTH_CONNECT'] ===
          PermissionsAndroid.RESULTS.GRANTED &&
          result['android.permission.BLUETOOTH_SCAN'] ===
          PermissionsAndroid.RESULTS.GRANTED &&
          result['android.permission.ACCESS_FINE_LOCATION'] ===
          PermissionsAndroid.RESULTS.GRANTED;

        cb(isGranted);
      }
    } else {
      cb(true);
    }
  };

  const isDuplicteDevice = (devices: Device[], nextDevice: Device) =>
    devices.findIndex(device => nextDevice.id === device.id) > -1;

  const scanForPeripherals = () =>
    bleManager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.log(error);
      }
      if (device && device.name?.includes('Adafruit')) {
        setAllDevices((prevState: Device[]) => {
          if (!isDuplicteDevice(prevState, device)) {
            return [...prevState, device];
          }
          return prevState;
        });
      }
    });

  const connectToDevice = async (device: Device) => {
    try {
      const deviceConnection = await bleManager.connectToDevice(device.id);
      setConnectedDevice(deviceConnection);
      const allSvcAndChar = await deviceConnection.discoverAllServicesAndCharacteristics();
      bleManager.stopDeviceScan();
      // console.log(deviceConnection);
      setStartTime(new Date().getTime());
      startStreamingData(allSvcAndChar);
    } catch (e) {
      console.log('FAILED TO CONNECT', e);
      // reset connection
      setConnectedDevice(null);
      // set tryingToConnect to false
      dispatch(setFalse());
    }
  };

  const disconnectFromDevice = () => {
    if (connectedDevice) {
      bleManager.cancelDeviceConnection(connectedDevice.id);
      setConnectedDevice(null);
      setFlowRate(0);
      setSpraySeconds(0);
      setStartTime(0);
    }
  };

  const onFlowUpdate = (
    error: BleError | null,
    characteristic: Characteristic | null,
  ) => {

    if (error) {
      console.log('this is where it fails');

      console.log(error);
      return -1;
    } else if (!characteristic?.value) {
      console.log('No Data was recieved');
      return -1;
    }

    const rawData = atob(characteristic.value);
    // setFlowRate(Number(rawData.slice(1).trim()) / 100);

    const flow = Number(rawData.slice(1).trim()) / 100;
    setFlowRate(flow);
    if (flow > 0) {
      setSpraySeconds(prev => prev + 1);
    }
    // if (rawData[0] === 'f') {

    // }
    // if (rawData[0] === 't') {
    //   setTotalFlow(Number(rawData.slice(1).trim()) / 100);
    // }

  };

  const onTotalFlowUpdate = (error: BleError | null, characteristic: Characteristic | null) => {

    if (error) {
      console.log('this is where it fails');

      console.log(error);
      return -1;
    } else if (!characteristic?.value) {
      console.log('No Data was recieved');
      return -1;
    }


    const rawData = atob(characteristic.value);
    console.log('totalFlow: ', rawData.slice(1));
    setTotalFlow(Number(rawData.slice(1).trim()) / 100);

  }

  const SERVICE_UUID = "0000180f-0000-1000-8000-00805f9b34fb"
  const TOTAL_CHARACTERISTIC_UUID = "00002a19-0000-1000-8000-00805f9b34fb"
  const CHARACTERISTIC_UUID = "00002a20-0000-1000-8000-00805f9b34fb"

  const startStreamingData = async (device: Device) => {

    // const services = await device.services();
    // console.log(services);
    
    // const service = services.filter(service => service.uuid === SERVICE_UUID)
    // const characteristics = await service[0].characteristics();
    // console.log(characteristics);


    if (device) {
      device.monitorCharacteristicForService(
        SERVICE_UUID,
        CHARACTERISTIC_UUID,

        (error, characteristic) => onFlowUpdate(error, characteristic),
      );

      device.monitorCharacteristicForService(
        SERVICE_UUID,
        TOTAL_CHARACTERISTIC_UUID,
        (error, characteristic) => onTotalFlowUpdate(error, characteristic),
      );

    } else {
      console.log('No Device Connected');
    }
  };
  // console.log(allDevices);

  return {
    scanForPeripherals,
    requestPermissions,
    connectToDevice,
    allDevices,
    connectedDevice,
    disconnectFromDevice,
    flowRate,
    totalFlow,
    spraySeconds,
    startTime,
    setSpraySeconds
  };
}

export default useBLE;
