import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from '@reduxjs/toolkit';

import pokemonReducer from './CardSlice.ts'; 
import FavSlice from './FavSlices.ts';



const rootReducer = combineReducers({
    CardPokemon: pokemonReducer, 
    Favoritos: FavSlice,
    });
export const store = configureStore({
  reducer: rootReducer,
  
    
  },
);
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
