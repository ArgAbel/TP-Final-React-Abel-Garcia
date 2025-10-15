export interface ApiTypeInfo { name: string; url: string; };
export interface ApiSlotType { slot: number; type: ApiTypeInfo; };
export interface ApiPokemonDetail { 
    id: number; 
    name: string; 
    sprites: {front_default: string | null;
        other?: { 
            'official-artwork'?: { front_default: string | null;
                
            }
}
    }; 
    types: ApiSlotType[]; 
}

export interface CardPokemon {
    id: number;
    name: string;
    images: string; 
    sprites: {
        front_default: string | null; // Acepta null
        other?: {
            'official-artwork'?: {
                front_default: string | null;
            } | undefined;
        } | undefined;
    };
    types: PokemonSlotType[]
        };
    
   
    export interface PokemonSlotType {
    slot: number;
    type: PokemonTypeInfo; // Usa la interfaz definida arriba
}

   export interface PokemonType {
    slot: number;
    type: PokemonType;
    name: string;
    };


export interface PokemonTypeInfo {
  name: string;
  url: string;
}
export interface FetchPokemonsPayload {
  results: CardPokemon[];
  offset: number;
  hasMore: boolean;
}
export interface PokemonState {
  list: CardPokemon[];
  offset: number;
  hasMore: boolean;
  loading: boolean;
  error: string | null;
}

export interface PokemonDetailed {
    id: number;
    name: string;
    sprites: {
        front_default: string | null; // Acepta null
        other?: {
            'official-artwork'?: {
                front_default: string | null;
            } | undefined;
        } | undefined;
    };
    types: PokemonSlotType[]
        height:number;
    weight: number;
   abilities: Array<{
        ability: {
            name: string; // Ej: "overgrow"
        }
    }>;
     stats: Array<{
        base_stat: number;
        stat: {
            name: string; // Ej: "hp", "attack", "defense"
        }
    }>;
     moves: Array<{
        move: {
            name: string; // Ej: "tackle"
        }   }>;
     }
export interface RouteParams{
    id:string | undefined;
}