import React, {Dispatch, SetStateAction} from 'react';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';
import NewJobScreen from '../screens/NewJobScreen';
import { Device } from 'react-native-ble-plx';
import JobListScreen from '../screens/JobListScreen';
import AccountInfoScreen from '../screens/AccountInfoScreen';
import { gunmetal, lightGreen, lightGunmetal, white, red, darkGreen } from '../lib/colors';


const appTheme ={
  ...DarkTheme,
  // dark: true,
  colors: {
    primary: darkGreen,
    background: gunmetal,
    card: gunmetal,
    text: white,
    border: '#00000000',
    notification: red,
  }
}

export type RootStackParamList = {
  Home: undefined;
  Job: undefined;
  History: undefined;
  Account: undefined;
  Device: { device: Device };
};

interface IProps {
  exposeModal: boolean,
  setExposeModal?: Dispatch<SetStateAction<boolean>>,
  setSpraySeconds?: Dispatch<SetStateAction<number>>,
  disconnectFromDevice: any,
}

const Stack = createStackNavigator<RootStackParamList>();


export const RootNavigator = ({exposeModal, setExposeModal, disconnectFromDevice, setSpraySeconds}: IProps) => (
    <NavigationContainer theme={appTheme}>
      <Stack.Navigator screenOptions={{presentation: 'card'}}>
        <Stack.Screen name="Home" component={Home} />
        {/* <Stack.Screen name="Job" component={Home} /> */}
        <Stack.Screen name="Job" options={{title: 'Job'}}>
          {(props) => <NewJobScreen {...props}  
              // connected={connected} 
              setExposeModal={setExposeModal} 
              exposeModal={exposeModal} 
              disconnectFromDevice={disconnectFromDevice} 
              setSpraySeconds={setSpraySeconds}/>}
        </Stack.Screen>
        <Stack.Screen name="History" options={{title: 'Job History'}} component={JobListScreen} />
        <Stack.Screen name="Account" options={{title: 'Account Info'}} component={AccountInfoScreen} />
        {/* <Stack.Screen name='Connect' > */}
          {/* {(props) => <ConnectScreen {...props} exposeModal={exposeModal} setExposeModal={setExposeModal}/>} */}
        {/* </Stack.Screen> */}

      </Stack.Navigator>
    </NavigationContainer>
);