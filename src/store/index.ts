// src/store/index.ts

import { configureStore } from "@reduxjs/toolkit";
import { useDispatch as useAppDispatch, TypedUseSelectorHook, useSelector as useAppSelector } from "react-redux";

// 👇 Import cả reducers VÀ RootState từ file vừa sửa ở Bước 1
import reducers, { RootState } from './reducers';

//===========================|| MAIN CONFIG || ========================//

const store = configureStore({
    reducer: reducers
});

// ❌ Xoá dòng cũ: export type RootState = ...
// ✅ Dùng dòng này (Export lại cái Type đã lấy từ reducers)
export type { RootState }; 

export type AppDisPatch = typeof store.dispatch;

const { dispatch } = store;

const useDispatch = () => useAppDispatch<AppDisPatch>();
const useSelector: TypedUseSelectorHook<RootState> = useAppSelector;

export { store, dispatch, useSelector, useDispatch };