import React, {useEffect, useState} from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
// import MapBoxGL from '@react-native-mapbox-gl/maps';


const MapScreen = () => {
    const [coordinates] = useState([78.9629, 20.5937]);
    // MapBoxGL.setAccessToken('pk.eyJ1Ijoic2FuZGVybWFubjciLCJhIjoiY2xkZDlia2hpMDFmbzN3azZ5dWJnNzQ1MSJ9.99MLFLdINkY9VgLsAv_GbA');

    useEffect(() => {
        // MUST HAVE FINE_LOCATION_PERMISSION ENABLED
            Geolocation.getCurrentPosition((position) => {
                console.log(position);
            }, (error) => {
                console.log(error.code, error.message);
            },
            {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000}
            )

    }, []);

    return ( 
         <View style={styles.page}>
            <View style={styles.container}>
              {/* <MapBoxGL.MapView style={styles.map}>
                <MapBoxGL.Camera
                  zoomLevel={4}
                  centerCoordinate={coordinates}
                />
                <MapBoxGL.PointAnnotation coordinate={coordinates} />
              </MapBoxGL.MapView> */}
            </View>
          </View>
        );
}

const styles = StyleSheet.create({
    page: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#F5FCFF"
    },
    container: {
    height: '100%',
      width: '100%',
      backgroundColor: 'blue',
    },
    map: {
      flex: 1
    }
  });
 
export default MapScreen;