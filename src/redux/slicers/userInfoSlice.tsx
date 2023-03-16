import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface UserInfoState {
    userID: string,
    email: string,
    firstName: string,
    lastName: string
}


const initialState: UserInfoState = {
    userID: '',
    email: '',
    firstName: '',
    lastName: '',
}

interface ResetState {
    offset: number,
    startingFlow: number
}

export const userInfoSlicer = createSlice({
    name: 'userInfo',
    initialState,
    reducers: {
        setUserInfo: (state, action: PayloadAction<UserInfoState>) => {
            state.userID = action.payload.userID;
            state.email = action.payload.email;
            state.firstName = action.payload.firstName;
            state.lastName = action.payload.lastName;
        },
        clearUserInfo: (state, action: PayloadAction<ResetState>) => {
            state.userID = '';
            state.email = '';
            state.firstName = '';
            state.lastName = '';
        },
        
    },
})

// Action creators are generated for each case reducer function
export const { setUserInfo, clearUserInfo } = userInfoSlicer.actions

export default userInfoSlicer.reducer