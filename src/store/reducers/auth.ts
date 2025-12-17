import { AuthProps } from "@/types/auth";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const initialState: AuthProps = {
    isLoggedIn: false,
    isInitialized: false,
    user: null
}


//=============== | AUTH REDUCER | ===============/

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginStore: (state, action: PayloadAction<{ user: any, isLoggedIn: boolean }>) => {
            state.isLoggedIn = action.payload.isLoggedIn;
            state.isInitialized = true;
            state.user = action.payload.user;
        },
        logoutStore: (state) => {
            state.isLoggedIn = false;
            state.isInitialized = false;
            state.user = null
        }
    }
});

export default authSlice.reducer;


export const { loginStore,logoutStore } = authSlice.actions;