import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from '@reduxjs/toolkit';

import pokemonReducer from './CardSlice.ts'; 

const rootReducer = combineReducers({
    CardPokemon: pokemonReducer, 
    });
export const store = configureStore({
  reducer: rootReducer,
   
    
  },
);
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
