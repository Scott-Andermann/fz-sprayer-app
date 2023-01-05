import React, {Dispatch, SetStateAction} from 'react';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';
import NewJobScreen from '../screens/NewJobScreen';
import { Device } from 'react-native-ble-plx';
import JobListScreen from '../screens/JobListScreen';
import DefaultsScreen from '../screens/DefaultsScreen';
import { gunmetal, white } from '../lib/colors';


const appTheme ={
  dark: true,
  colors: {
    background: gunmetal,
    text: white,
  }
}

export type RootStackParamList = {
  Home: undefined;
  Device: { device: Device };
};

interface IProps {
  exposeModal: boolean,
  setExposeModal?: Dispatch<SetStateAction<boolean>>,
  setSpraySeconds?: Dispatch<SetStateAction<number>>,
  data: any,
  connected: boolean,
  disconnectFromDevice: any,
}

const Stack = createStackNavigator<RootStackParamList>();

export const RootNavigator = ({exposeModal, setExposeModal, data, connected, disconnectFromDevice, setSpraySeconds}: IProps) => (
    <NavigationContainer theme={appTheme}>
      <Stack.Navigator screenOptions={{presentation: 'card'}}>
        <Stack.Screen name="Home" component={Home} />
        {/* <Stack.Screen name="Job" component={Home} /> */}
        <Stack.Screen name="New Job" >
          {(props) => <NewJobScreen {...props} data={data} connected={connected} setExposeModal={setExposeModal} exposeModal={exposeModal} disconnectFromDevice={disconnectFromDevice} setSpraySeconds={setSpraySeconds}/>}
        </Stack.Screen>
        <Stack.Screen name="Job List" component={JobListScreen} />
        <Stack.Screen name="Defaults" component={DefaultsScreen} />
        {/* <Stack.Screen name='Connect' > */}
          {/* {(props) => <ConnectScreen {...props} exposeModal={exposeModal} setExposeModal={setExposeModal}/>} */}
        {/* </Stack.Screen> */}

      </Stack.Navigator>
    </NavigationContainer>
);