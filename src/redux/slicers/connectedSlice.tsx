import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface ConnectedState {
  value: boolean
}

const initialState: ConnectedState = {
  value: false,
}

export const connectedSlicer = createSlice({
  name: 'connected',
  initialState,
  reducers: {
    connect: (state) => {
        state.value = true
    },
    disconnect: (state) => {
        state.value = false
    }
  },
})

// Action creators are generated for each case reducer function
export const { connect, disconnect } = connectedSlicer.actions

export default connectedSlicer.reducer