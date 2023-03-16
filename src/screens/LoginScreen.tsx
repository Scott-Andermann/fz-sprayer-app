import React, {useState} from 'react';
import { View, Text, StyleSheet, ImageBackground, Dimensions, Image, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LoginInput from '../components/LoginInput';
import LinearGradient from 'react-native-linear-gradient';
import GradientButton from '../components/GradientButton';
import OutlineButton from '../components/OutlineButton';
import {sha256} from 'js-sha256';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAppDispatch } from '../redux/hooks';
import { setUserInfo } from '../redux/slicers/userInfoSlice';



const image = { uri: 'https://reactjs.org/logo-og.png' };
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const LoginScreen = ({ navigation }: { navigation: any }) => {

    const dispatch = useAppDispatch();

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [invalid, setInvalid] = useState<boolean>(false);

    const storeToken = async (userID: string) => {
        try {
            const jsonToken = JSON.stringify(userID);
            await AsyncStorage.setItem('@token', jsonToken)
        } catch (e) {
            console.log('error: ', e);
            
        }
    }

    const login = async () => {
        // encrypt password and try to login
        const body = {email: email, password: sha256(password)}
        
        const response = await fetch(`http://localhost:5000/login`, {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(body)});
        const userInfo = await response.json();
        if (userInfo['status'] === 'Successful') {
            const data = userInfo.userInfo
            await storeToken(data[0])
            dispatch(setUserInfo({userID: data[0], email: data[1], firstName: data[3], lastName: data[4]}))
            setInvalid(false);
            setPassword('');
            navigation.navigate('Home');

        } else {
            console.log('invalid credentials');
            setInvalid(true);
            
        }
    }

    const getToken = async () => {
        try {
            const value = await AsyncStorage.getItem('@token');
            
            if (value !== null) {
                // setToken(value);
                console.log(value);
                
            }
        }
        catch (e) {
            console.log('error requesting token: ', e);
            
        }
    }
    return (
            <ImageBackground source={require('../assets/sprayer_home.webp')} style={styles.image} resizeMode='cover' blurRadius={5}>
        <View style={styles.wrapper}>
                <View style={styles.container}>
                    <Image
                        style={styles.logoImage}
                        source={require('../assets/fzlogo.png')} />
                    <Text style={styles.titleText}>TRUFLOW</Text>
                    <View style={styles.spacer} />
                    <LoginInput type='user' value={email} setValue={setEmail} />
                    <LoginInput type='password' value={password} setValue={setPassword} />
                    {invalid && <Text style={styles.recoverLink}>Invalid Credentials</Text>}
                    <View style={styles.recoverLinkWrapper}>
                        <TouchableOpacity>
                            <Text style={styles.recoverLink}>Forgot Password?</Text>
                        </TouchableOpacity>
                    </View>
                    <GradientButton text='Log In' onPress={login} />
                    <OutlineButton text='Register' onPress={getToken} />
                </View>
        </View>
            </ImageBackground>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        height: screenHeight,
        width: screenWidth,
        flex: 1,
        padding: screenWidth * 0.15
    },
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    image: {
        flex: 1,
        justifyContent: 'center',
        // width: 200,
        // height: 200,
        resizeMode: 'center',
        filter: 'blur(4px)',
    },
    titleText: {
        color: 'white',
        fontSize: 36,
        fontWeight: 'bold',
    },
    logoImage: {
        width: screenWidth / 2,
        height: 80,
        // height: 'auto',
        resizeMode: 'center'
    },
    spacer: {
        height: 60
    },
    recoverLinkWrapper: {
        width: '100%',
        marginBottom: 30,
    },
    recoverLink: {
        textAlign: 'right',
        color: 'white',
        fontSize: 16
    },
    loginButton: {
        width: screenWidth * 0.7,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        borderRadius: 25,
        overflow: 'hidden',
        margin: 6
    },

    loginButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
    },

})

export default LoginScreen;