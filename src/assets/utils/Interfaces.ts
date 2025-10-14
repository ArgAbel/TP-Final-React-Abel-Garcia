export interface CardPokemon {
    id: number;
    name: string;
    sprites: {
        front_default: string; 
    };
    types: {
        slot: number;
        type: {
            name: string; 
            url: string;
        };
    }[];
   
}
export interface Pokemon {
  name: string;
  url: string;
}
export interface FetchPokemonsPayload {
  results: Pokemon[];
  offset: number;
  hasMore: boolean;
}
export interface PokemonState {
  list: Pokemon[];
  offset: number;
  hasMore: boolean;
  loading: boolean;
  error: string | null;
}

export interface Poke1llamado{
    name: string;
    url: string;
}
export interface PokemonDetail {
    id: number;
    name: string;
    altura: number;
    peso: number;
    tipos: string[];
    habilidades: string[];
    stats: { name: string; value: number }[];
     sprites: {
        front_default: string; 
    };
}