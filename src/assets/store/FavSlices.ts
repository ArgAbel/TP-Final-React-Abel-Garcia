import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type CardPokemon } from '../utils/Interfaces.ts';

const initialState: CardPokemon[] = [];

export const FavSlice = createSlice({
  name: 'FavPokemon',
  initialState, // como tiene el mismo nombre, no es necesario poner initialState: initialState
  reducers: {
    addFav: (state, action: PayloadAction<CardPokemon>) => {
      state.push({ ...action.payload });
    },
    deleteFav: (state, action: PayloadAction<number>) => {
      return state.filter((Pfav) => Pfav.id !== action.payload);
    },
  },
});
export const { addFav, deleteFav } = FavSlice.actions; 
export default FavSlice.reducer;