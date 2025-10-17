import { useEffect, useState } from "react";
import { type PokemonDetailed } from "../../../src/assets/utils/Interfaces.ts";
import { useParams } from "react-router-dom";
import { type PokedexParams } from "../../../src/assets/utils/Interfaces.ts";
const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

import "./pokedex.css";

export function Pokedex() {
  const { id } = useParams<PokedexParams>();
  const pokemonId = id;
  const [PokemonDetail, setPokemonDetail] = useState<PokemonDetailed | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!pokemonId) {
      setLoading(false);
      return;
    }
    const fetchDetails = async () => {
      setLoading(true);
      setError(null);

      const Base = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;
      try {
        const response = await fetch(Base);

        if (!response.ok) {
          throw new Error(
            `Error ${response.status}: Fallo al obtener el Pokémon ${pokemonId}`
          );
        }
        const data: PokemonDetailed = await response.json();
        setPokemonDetail(data);
      } catch (err) {
        setError(
          (err as Error).message || "Fallo desconocido al cargar detalles."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [pokemonId]);
  if (loading) {
    return <div>Cargando detalles de Pokémon...</div>;
  }

  if (error) {
    return <div>Error al cargar: {error}</div>;
  }

  if (!PokemonDetail) {
    return <div>No se encontró el Pokémon.</div>;
  }
  const imageUrl =
    PokemonDetail.sprites.other?.["official-artwork"]?.front_default ||
    PokemonDetail.sprites.front_default ||
    "placeholder.png"; // Fallback
  const typesString = PokemonDetail.types
    .map((t) => capitalize(t.type.name))
    .join(" / ");
  const mainStats = PokemonDetail.stats.slice(0, 4);
  const mainAbilities = PokemonDetail.abilities.slice(0, 4);
  const casilleroData = [
    { label: "ID", value: `#${PokemonDetail.id}` },
    { label: "Tipo", value: typesString },
    { label: "Altura", value: `${PokemonDetail.height / 10} m` },
    { label: "Peso", value: `${PokemonDetail.weight / 10} kg` },
    ...mainStats.map((stat) => ({
      label: capitalize(stat.stat.name),
      value: stat.base_stat,
    })),
  ];
  while (casilleroData.length < 8 && mainAbilities.length > 0) {
    const ability = mainAbilities.shift();
    if (ability) {
      casilleroData.push({
        label: "Habilidad",
        value: capitalize(ability.ability.name),
      });
    }
  }
  while (casilleroData.length < 8) {
    casilleroData.push({ label: "Dato", value: "N/A" });
  }
  return (
    <>
      <div className="contenedor-principal">
        <header className="grid-header">
          <h1>{capitalize(PokemonDetail.name)}</h1>
        </header>

        <div className="grid-imagen">
          <img src={imageUrl} alt={`Arte oficial de ${PokemonDetail.name}`} />
        </div>

        <div className="grid-datos">
          {casilleroData.map((data, index) => (
            <div key={index} className="casillero">
              <strong>{data.label}:</strong> {data.value}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
