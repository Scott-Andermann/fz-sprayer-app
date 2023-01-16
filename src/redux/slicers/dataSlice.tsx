import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface DataState {
    flowRate: number,
    totalFlow: number,
    spraySeconds: number,
    startTime: number,
    offset: number,
    startingFlow: number
}


const initialState: DataState = {
    flowRate: 0,
    totalFlow: 0,
    spraySeconds: 0,
    startTime: 0,
    offset: 0,
    startingFlow: 0,
}

interface ResetState {
    offset: number,
    startingFlow: number
}

export const dataSlicer = createSlice({
    name: 'connected',
    initialState,
    reducers: {
        setAllData: (state, action: PayloadAction<DataState>) => {
            if (action.payload.totalFlow > 1 && state.totalFlow === 0) {
                state.startingFlow = action.payload.totalFlow
            } 
            state.flowRate = action.payload.flowRate;
            state.totalFlow = action.payload.totalFlow;
            state.spraySeconds = action.payload.spraySeconds;
            state.startTime = action.payload.startTime;
            // state.startingFlow = action.payload.startingFlow;
        },
        resetData: (state, action: PayloadAction<ResetState>) => {
            state.offset = action.payload.offset;
            state.startingFlow = action.payload.startingFlow;
        },
        setInitial: (state, action: PayloadAction<number>)=> {
            state.startingFlow = action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { setAllData, resetData, setInitial } = dataSlicer.actions

export default dataSlicer.reducer