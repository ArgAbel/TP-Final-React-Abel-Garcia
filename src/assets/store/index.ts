import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from '@reduxjs/toolkit';

import pokemonReducer from './CardSlice.ts'; 
import FavSlice from './FavSlices.ts';

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const favPersistConfig = {
  key: 'favs',
  storage,
  whitelist: ['Favoritos'], // 👈 Solo queremos persistir esta clave del estado
};



  
const rootReducer = combineReducers({
    CardPokemon: pokemonReducer, 
    Favoritos: FavSlice,
    });
    const persistedReducer = persistReducer(favPersistConfig, rootReducer);
export const store = configureStore({
 
  reducer: persistedReducer, // Usar el reducer persistido
  // Esto evita warnings por datos no serializables de Redux Persist
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});
    
export const persistor = persistStore(store); 
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
