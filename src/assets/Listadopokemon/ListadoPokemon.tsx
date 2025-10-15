import './cards.css';

import React, { useEffect } from 'react'; 

import type {CardPokemon} from '../utils/Interfaces.ts';



import { fetchPokemons } from '../store/CardSlice.ts'; 
import { useAppDispatch, useAppSelector } from '../../hooks/useHook.ts'; 
// --- Hooks tipados ---

// Define los tipos de la tienda (Store)
// IMPORTANTE: Debes crear estos tipos en tu archivo de store.ts
// Ejemplo: export type RootState = ReturnType<typeof store.getState>;
// Ejemplo: export type AppDispatch = typeof store.dispatch;



// El nombre correcto de la función del componente debe ser con mayúscula
const Pokekard: React.FC = () => { 
  // Usamos el hook tipado
  const dispatch = useAppDispatch();
  
  

  const { list, offset, hasMore, loading, error }=useAppSelector(
    (state) => state.CardPokemon// Usa 'CardPokemon' como la clave en tu store
  );

  // Carga inicial al montar el componente
  useEffect(() => { 
    // Dispara la carga inicial si no se ha cargado nada
    if (list.length === 0 && hasMore) {
        dispatch(fetchPokemons(0)); 
    }
  }, [dispatch, list.length, hasMore]);


  // --- Renderizado del componente ---
  return (
        <div>
            <h1>Pokédex con TypeScript</h1>
            
            {loading && <p>Cargando Pokémons...</p>}
            
            {error && <p style={{ color: 'red' }}>Error: {error}</p>}

            <ul>
                {/* Añadimos un chequeo de seguridad (list &&) para evitar fallos si Redux no está listo.
                  Esto previene el error: "Cannot read properties of undefined (reading 'map')"
                */}
                {list && list.map((pokemon: CardPokemon) => ( 
                    <li key={pokemon.name}> 
                        {pokemon.name.toUpperCase()} 
                        <small>({pokemon.id})</small>
                       <span>{pokemon.types.map(t => t.type.name).join(', ')}</span>
                        <img src={pokemon.sprites.front_default} 
                  alt={`Sprite de ${pokemon.name}`} 
               className="pokemon-sprite"
                loading="lazy" // Buena práctica para imágenes que no están en la vista inicial
                  />
                    </li>
                ))}
            </ul>


            {hasMore && !loading && (
                <button onClick={() => dispatch(fetchPokemons(offset))}>
                    Cargar Más (offset: {offset})
                </button>
            )}

            {!hasMore && <p>¡Has visto todos los Pokémons disponibles!</p>}
        </div>
    );
}

export default Pokekard;
