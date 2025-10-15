import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { type PokemonTypeInfo, type PokemonState, type ApiPokemonDetail } from '../utils/Interfaces';// 2. Tipo para el estado completo del slice
import { type FetchPokemonsPayload } from '../utils/Interfaces';
import { type CardPokemon} from '../utils/Interfaces';
// --- Interfaces para el tipado ---






// --- Thunk Asíncrono para obtener Pokémons ---
export const fetchPokemons = createAsyncThunk<
  FetchPokemonsPayload, // El tipo de lo que retorna la promesa (el payload en 'fulfilled')
  number,               // El tipo del argumento que acepta la función (offset)
  { rejectValue: string } // Tipo para el error rechazado
>(
  "pokemon/fetchPokemons",
  async (offset: number = 0, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`
      );

      if (!response.ok) {
        // Usamos rejectWithValue para que el rejected case maneje un string de error tipado
        return rejectWithValue(`Error al obtener pokémons: ${response.status}`);
      }

      const data = await response.json();
      const detailPromises = data.results.map((pokemon: PokemonTypeInfo) => 
        fetch(pokemon.url).then(res => {
          if (!res.ok) {
            // Manejo de error individual (podrías hacer algo más sofisticado aquí)
            throw new Error(`Fallo al obtener detalle de ${pokemon.name}`);
          }
          return res.json();
        })
      );
        const detailedResults = await Promise.all(detailPromises);
        const formattedResults: CardPokemon[] = detailedResults.map((detail: ApiPokemonDetail) => ({
          id: detail.id,
          name: detail.name,
          // Usamos la imagen frontal estándar
          images: detail.sprites.other?.['official-artwork']?.front_default 
          || detail.sprites.front_default 
          || '', 
          sprites: detail.sprites,
           types: detail.types,
         
        }));
        return {
        results: formattedResults,
        offset: offset + 20,
        hasMore: !!data.next,
      } as FetchPokemonsPayload; // Casteamos para asegurar el tipado de retorno
      
    } catch (err) {
      // Manejo de errores de red o parseo
      return rejectWithValue("Fallo la conexión o el parseo de datos.");
    }
  }
);


// --- Slice de Redux ---
const initialState: PokemonState = {
  list: [],
  offset: 0,
  hasMore: true,
  loading: false,
  error: null,
};

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    // Reducer para resetear el estado
    resetPokemons: (state) => {
      state.list = [];
      state.offset = 0;
      state.hasMore = true;
      state.error = null;
      state.loading = false;
    },
  },
  // Manejo de las acciones generadas por el createAsyncThunk
  extraReducers: (builder) => {
    builder
      // Estado Pendiente
      .addCase(fetchPokemons.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Estado Cumplido: el action es tipado automáticamente a PayloadAction<FetchPokemonsPayload>
      .addCase(fetchPokemons.fulfilled, (state, action) => {
        state.loading = false;
        const { results, offset, hasMore } = action.payload;
        state.list = [...state.list, ...results]; 
        state.offset = offset;
        state.hasMore = hasMore;
      })
      // Estado Rechazado: el action.payload es el string que pasamos a rejectWithValue
      .addCase(fetchPokemons.rejected, (state, action) => {
        state.loading = false;
        // El error puede venir de rejectWithValue (payload) o del error de JS (error.message)
        state.error = action.payload || action.error.message || "Fallo desconocido al cargar pokémons";
      });
  },
});

// Exportar las acciones y el reducer
export const { resetPokemons } = pokemonSlice.actions;
export default pokemonSlice.reducer;