import React, {Dispatch, SetStateAction} from 'react';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';
import NewJobScreen from '../screens/NewJobScreen';
import { Device } from 'react-native-ble-plx';
import JobListScreen from '../screens/JobListScreen';
import AccountInfoScreen from '../screens/AccountInfoScreen';
import { gunmetal, lightGreen, lightGunmetal, white, red, darkGreen } from '../lib/colors';
import HeaderConnection from '../components/HeaderConnection';

import {View, Text} from 'react-native';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';


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
  Login: undefined;
  Home: undefined;
  Job: undefined;
  History: undefined;
  Account: undefined;
  Map: undefined;
  Register: undefined;
  Device: { device: Device };
};

interface IProps {
  exposeModal: boolean,
  setExposeModal?: Dispatch<SetStateAction<boolean>>,
  setSpraySeconds?: Dispatch<SetStateAction<number>>,
  disconnectFromDevice: any,
  token: string
}

const Stack = createStackNavigator<RootStackParamList>();

function HeaderLogo() {
  return (
    <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center'}}>
      <Text style={{color: 'white', padding: 5, fontSize: 22}}></Text>
    </View>
  );
}


export const RootNavigator = ({exposeModal, setExposeModal, disconnectFromDevice, setSpraySeconds, token}: IProps) => (
    // <NavigationContainer theme={appTheme}>
    //   <Tab.Navigator>
    //     <Tab.Screen name="Home" component={Home} options={{title: 'Home', headerTitle: () => <HeaderConnection title='Home' />}} />
    //     <Tab.Screen name="Job" options={{title: 'Job', headerTitle: () => <HeaderConnection title='Job' />}}>
    //       {(props) => <NewJobScreen {...props}  
    //           // connected={connected} 
    //           setExposeModal={setExposeModal} 
    //           exposeModal={exposeModal} 
    //           disconnectFromDevice={disconnectFromDevice} 
    //           setSpraySeconds={setSpraySeconds}/>}
    //     </Tab.Screen>
    //     <Tab.Screen name="History" options={{title: 'Job History', headerTitle: () => <HeaderConnection title='Job History' />}} component={JobListScreen} />
    //     <Tab.Screen name="Account" options={{title: 'Account Info', headerTitle: () => <HeaderConnection title='Account' />}} component={AccountInfoScreen} />
    //   </Tab.Navigator>
    // </NavigationContainer>
    <NavigationContainer theme={appTheme}>
      <Stack.Navigator screenOptions={{presentation: 'card'}}>
        {token === '' && <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/> }
        <Stack.Screen name="Home" component={Home} options={{title: 'Home', headerTitle: () => <HeaderConnection title='Home' />}} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{headerShown: false}} />
        <Stack.Screen name="Job" options={{title: 'Job', headerTitle: () => <HeaderConnection title='Job' />}}>
          {(props) => <NewJobScreen {...props}  
              // connected={connected} 
              setExposeModal={setExposeModal} 
              exposeModal={exposeModal} 
              disconnectFromDevice={disconnectFromDevice} 
              setSpraySeconds={setSpraySeconds}/>}
        </Stack.Screen>
        <Stack.Screen name="History" options={{title: 'Job History', headerTitle: () => <HeaderConnection title='Job History' />}} component={JobListScreen} />
        <Stack.Screen name="Account" options={{title: 'Account Info', headerTitle: () => <HeaderConnection title='Account' />}} component={AccountInfoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
);