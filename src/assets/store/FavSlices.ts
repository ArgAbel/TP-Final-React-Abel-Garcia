import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type CardPokemon } from '../utils/Interfaces.ts';
import {createSelector} from '@reduxjs/toolkit';
import {type RootState } from '.././store/index.ts';

const initialState: CardPokemon[] = [];

export const FavSlice = createSlice({
  name: 'FavPokemon',
  initialState, // como tiene el mismo nombre, no es necesario poner initialState: initialState
  reducers: {
    addFav: (state, action: PayloadAction<CardPokemon>) => {
      const newPokemon = action.payload;
    if (!state.some(pokemon => pokemon.id === newPokemon.id)) {
        state.push(newPokemon);
      }
    },
     deleteFav: (state, action: PayloadAction<CardPokemon>) => {
      const pokemonToDelete = action.payload;
      return state.filter(pokemon => pokemon.id !== pokemonToDelete.id);
     },
  },
})

export const { addFav, deleteFav } = FavSlice.actions; 
export default FavSlice.reducer;

 const selectFavoriteList = (state: RootState) => state.Favoritos;export const makeSelectIsFavorite = (pokemonId: number) => 
  createSelector(
    // Dependencia: La lista de favoritos del slice
    [selectFavoriteList], 
    
    // Lógica de verificación: solo se re-ejecuta si favoritesList cambia
    (favoritesList) => {
      return favoritesList.some(pokemon => pokemon.id === pokemonId);
    }
  );