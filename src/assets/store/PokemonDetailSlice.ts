import { createSlice } from '@reduxjs/toolkit';
import { type PokemonDetail} from '../utils/Interfaces';

const initialState: PokemonFavoritos[] = [];

export const PokemonDetailSlice = createSlice({
  name: 'users',
  initialState, // como tiene el mismo nombre, no es necesario poner initialState: initialState
  reducers: {},
});

export default PokemonFavoritosSlice.reducer;