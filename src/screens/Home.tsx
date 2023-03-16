import React from 'react';
import {
    StyleSheet,
    View,
    Image,
    Linking,
    Alert,
    Text,
    ImageBackground,
    Dimensions,
    ScrollView
} from 'react-native';
import { darkGreen, gunmetal, lightGreen } from '../lib/colors';
// import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
// import {faMugSaucer} from '@fortawesome/free-solid-svg-icons';
import Icon from 'react-native-vector-icons/FontAwesome';
import RoundButton from '../components/RoundButton';
import { decrement, increment } from '../redux/slicers/counterSlice';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import Footer from '../components/Footer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import HomeCard from '../components/HomeCard';
import { FlatList } from 'react-native-gesture-handler';


const screenHeight = Dimensions.get('window').height

const Home = ({ navigation }: { navigation: any }) => {

    const count = useAppSelector((state) => state.counter.value);
    const location = useAppSelector((state) => state.location);

    const firstName = useAppSelector((state) => state.userInfo.firstName)

    const url = 'https://fzspray.com/'


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

    const openStoreLink = async () => {
        try {
            await Linking.openURL(url);
        } catch {
            Alert.alert('Error: webpage not responding, please visit fzspray.com for store details')
        }
    }

    const data = ['test', 'one', 'two']

    return (

        <View style={styles.container}>
            <ScrollView>
                <ImageBackground source={require('../assets/sprayer_home.webp')} style={[styles.backgroundImage, styles.shadowProp]} resizeMode='cover' blurRadius={5}>
                    <View style={styles.header}>
                        <MaterialIcons name='person-outline' size={50} color={lightGreen} />
                        <Text style={styles.headerText}>TRUFLOW</Text>
                    </View>
                    <View style={styles.welcomeWrapper}>
                        <Text style={styles.welcomeText}>Welcome,</Text>
                        <Text style={[styles.welcomeText, { fontSize: 40, fontWeight: 'bold' }]}>{firstName}</Text>
                    </View>
                    <View style={[styles.headshot, styles.shadowProp]}>
                        <MaterialIcons name='image-search' size={80} color='#8F8F8F' />
                    </View>
                </ImageBackground>
                <View style={styles.spacer} />
                <View style={styles.contentWrapper} >
                    <View style={styles.contentWide}></View>
                        <View style={styles.contentCardContainer}>
                            {/* <FlatList data={data} renderItem={(item) => <HomeCard />} /> */}
                            <HomeCard />
                            <HomeCard />
                            <HomeCard />
                        </View>
                </View>
                <View style={styles.lowerSpacer} />
            </ScrollView>
            <Footer screen='home' navigation={navigation} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        height: '100%',
        flex: 1,
        flexDirection: 'column',
        // alignItems: 'center',
        justifyContent: 'flex-start',
    },
    backgroundImage: {
        width: '100%',
        height: 0.3 * screenHeight,
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 10
    },
    headerText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 28,
        letterSpacing: -1.5,
    },
    welcomeWrapper: {
        padding: 24
    },
    welcomeText: {
        fontSize: 30,
        color: 'white',
        opacity: 1,
    },
    headshot: {
        height: 120,
        width: 120,
        borderRadius: 60,
        backgroundColor: '#ECECEC',
        position: 'absolute',
        right: 30,
        bottom: -60,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    spacer: {
        height: 60,
    },
    contentWrapper: {
        margin: 20,
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        // backgroundColor: 'blue',
    },
    contentWide: {
        width: '100%',
        backgroundColor: '#ECECEC',
        height: 120,
        borderRadius: 20,
    },
    contentCardContainer: {
        marginTop: 10,
        display: 'flex',
        flex: 2,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center'
        // justifyContent: 'flex-start',
        // maxWidth: 200,
    },
    lowerSpacer: {
        height: 80,
    },
    shadowProp: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.65,
        shadowRadius: 6.27,

        elevation: 10,
    }
})


export default Home;