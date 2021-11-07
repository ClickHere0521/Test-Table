import { combineReducers } from "redux"; 
import { configureStore } from '@reduxjs/toolkit';
// import { persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
import fileSlice from './fileSlice';

const reducers = combineReducers({
  table: fileSlice,  
});
 
// const persistConfig = {
//     key: 'root',
//     storage
// };
 
// const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  }),
});
