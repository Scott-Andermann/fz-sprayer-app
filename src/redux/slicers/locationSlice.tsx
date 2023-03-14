import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface LocationState {
    latitude: number,
    longitude: number
}


const initialState: LocationState = {
    latitude: 0,
    longitude: 0
}

interface ResetState {
    offset: number,
    startingFlow: number
}

export const locationSlicer = createSlice({
    name: 'location',
    initialState,
    reducers: {
        setLocation: (state, action: PayloadAction<LocationState>) => {
            state.latitude = action.payload.latitude;
            state.longitude = action.payload.longitude;

        },
        resetData: (state, action: PayloadAction<ResetState>) => {

        },
        setInitial: (state, action: PayloadAction<number>)=> {

        }
    },
})

// Action creators are generated for each case reducer function
export const { setLocation, resetData, setInitial } = locationSlicer.actions

export default locationSlicer.reducer