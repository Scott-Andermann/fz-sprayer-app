import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';
import {
    View,
    Image,
    TouchableOpacity,
    Text,
    StyleSheet,
    FlatList,
} from 'react-native'
import JobCard from '../components/JobCard';
import JobListFooter from '../components/JobListFooter';
import { darkGreen, gunmetal } from '../lib/colors';

interface description {
    name: string
}

interface element {
    time: Array<string>,
    totalFlow: Array<Number>,
    description: description
}

const JobListScreen = () => {
    // TODO: on mount ping server for latest 5 jobs and show info
    // TODO: create job card to extend
    // TODO: call api again on scroll
    const [data, setData] = useState<Array<element>>([]);
    const [page, setPage] = useState<number>(0);
    const [end, setEnd] = useState<boolean>(false);

    const hitAPI = async () => {
        const response = await fetch(`http://localhost:5000/get_jobs?page=${page}`);
        const result = await response.json();
        
        if (result === 'none' || result.length === 0) {
            setEnd(true)
            return
        }
        
        setData(prev => [...prev, ...result])
        setPage(prev => prev + 1)
    }

    useEffect(() => {
        hitAPI()
    }, []);

    // console.log(data.length);
    

    return ( 
        <View style={styles.container}>
            {/* <ScrollView>
                {data.length > 0 && data.map((element: element, index: React.Key | null | undefined) => <JobCard key={index} timeArray={element['time']} totalFlow={element['totalFlow']} description={element['description']}/>)}
            </ScrollView> */}
            {data.length > 0 && <FlatList
                onEndReached={hitAPI}
                data={data}
                ListFooterComponent={<JobListFooter end={end} />}
                renderItem={({item: element}) => (<JobCard timeArray={element['time']} totalFlow={element['totalFlow']} description={element['description']}/>)}
            />
            }
            <View style={{height: 20}} />
            {/* <TouchableOpacity
                style={end ? {...styles.button, ...styles.buttonDisabled} : {...styles.button, ...styles.buttonActive}}
                onPress={hitAPI}
                disabled={end}>
                <Text style={end ? {...styles.buttonText, ...styles.buttonTextDisabled} : {...styles.buttonText, ...styles.buttonTextActive}}>Load More</Text>
            </TouchableOpacity> */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: gunmetal,
        height: '100%',
        flex: 1,
        justifyContent: 'center'
    },
    button: {
        // backgroundColor: darkGreen,
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        marginHorizontal: 20,
        marginBottom: 5,
        borderRadius: 8,
    },
    buttonActive: {
        backgroundColor: darkGreen,
    },
    buttonDisabled: {
        backgroundColor: '#a7be9c',
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
    buttonTextActive: {
        color: 'white',
    },
    buttonTextDisabled: {
        color: '#A0A0A0'
    }
})
 
export default JobListScreen;