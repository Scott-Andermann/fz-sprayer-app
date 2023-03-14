import Geolocation from 'react-native-geolocation-service';
import React, { useEffect } from 'react';

import { useAppDispatch } from '../redux/hooks';
import { setLocation } from '../redux/slicers/locationSlice';

type VoidCallback = (result: boolean) => void;

const Location = ({ requestPermissions }: { requestPermissions(cb: VoidCallback): Promise<void>; }) => {

    const dispatch = useAppDispatch();

    useEffect(() => {
        let watchId: number;
        requestPermissions(isGranted => {
            if (isGranted) {
                // get position 1 time
                // Geolocation.getCurrentPosition((position) => {
                //     console.log(position);
                //     // setLocation({latitude: position.coords.latitude, longitude: position.coords.longitude})
                //     dispatch(setLocation({latitude: position.coords.latitude, longitude: position.coords.longitude}))

                // }, (error) => {
                //     console.log(error.code, error.message);

                // }, {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000})

                watchId = Geolocation.watchPosition((position) => {
                    dispatch(setLocation({ latitude: position.coords.latitude, longitude: position.coords.longitude }))
                }, (error) => {
                    console.log(error.code, error.message);
                }, { enableHighAccuracy: true, distanceFilter: 5 }
                )
            }
        })
        return () => Geolocation.clearWatch(watchId);
    }, []);

    return (
        <>

        </>
    );
}

export default Location;