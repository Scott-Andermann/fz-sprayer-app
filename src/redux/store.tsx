import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slicers/counterSlice';
import spraySecondsReducer from './slicers/spraySecondsSlice';
import connectedReducer from './slicers/connectedSlice';
import tryingToConnectReducer from './slicers/tryingToConnectSlice';
import dataReducer from './slicers/dataSlice';
import locationReducer from './slicers/locationSlice';

const rootReducer = combineReducers({
        location: locationReducer,
        counter: counterReducer,
        spraySeconds: spraySecondsReducer,
        connected: connectedReducer,
        tryingToConnect: tryingToConnectReducer,
        data: dataReducer
    },
);

const store = configureStore({reducer: rootReducer} );

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store;