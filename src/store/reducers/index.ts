// src/store/reducers/index.ts

import { combineReducers } from "@reduxjs/toolkit";
import authSlice from './auth';

const reducers = combineReducers({
    authSlice 
});

export type RootState = ReturnType<typeof reducers>;

export default reducers;