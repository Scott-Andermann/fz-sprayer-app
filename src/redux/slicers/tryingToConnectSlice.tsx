import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface TryingToConnectState {
  value: boolean
}

const initialState: TryingToConnectState = {
  value: false,
}

export const tryingToConnectSlicer = createSlice({
  name: 'tryingToConnect',
  initialState,
  reducers: {
    setTrue: (state) => {
        state.value = true
    },
    setFalse: (state) => {
        state.value = false
    }
  },
})

// Action creators are generated for each case reducer function
export const { setTrue, setFalse } = tryingToConnectSlicer.actions

export default tryingToConnectSlicer.reducer