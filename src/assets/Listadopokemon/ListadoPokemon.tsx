import "./cards.css";

import React, { useEffect } from "react";

import type { CardPokemon } from "../utils/Interfaces.ts";

import { fetchPokemons } from "../store/CardSlice.ts";
import { useAppDispatch, useAppSelector } from "../../hooks/useHook.ts";

const Pokekard: React.FC = () => {
  // Usamos el hook tipado
  const dispatch = useAppDispatch();

  const { list, offset, hasMore, loading, error } = useAppSelector(
    (state) => state.CardPokemon // Usa 'CardPokemon' como la clave en tu store
  );

  // Carga inicial al montar el componente
  useEffect(() => {
    // Dispara la carga inicial si no se ha cargado nada
    if (list.length === 0 && hasMore) {
      dispatch(fetchPokemons(0));
    }
  }, [dispatch, list.length, hasMore]);

  return (
    <div>
      <h1>Pokédex con TypeScript</h1>

      {loading && <p>Cargando Pokémons...</p>}

      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      <ul>
        {list &&
          list.map((pokemon: CardPokemon) => (
            <li key={pokemon.name}>
              {pokemon.name.toUpperCase()}
              <small>({pokemon.id})</small>
              <span>{pokemon.types.map((t) => t.type.name).join(", ")}</span>
              <img
                src={pokemon.sprites.front_default ?? "URL_IMAGEN_DEFAULT.png"}
                alt={`Sprite de ${pokemon.name}`}
                className="pokemon-sprite"
                loading="lazy"
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
};

export default Pokekard;
