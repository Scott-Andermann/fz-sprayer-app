import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface SpraySecondsSlice {
  value: number
}

const initialState: SpraySecondsSlice = {
  value: 0,
}

export const spraySecondsSlice = createSlice({
  name: 'spraySeconds',
  initialState,
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1
    },
    reset: (state) => {
        state.value = 0
    }
  },
})

// Action creators are generated for each case reducer function
export const { increment, reset } = spraySecondsSlice.actions

export default spraySecondsSlice.reducer