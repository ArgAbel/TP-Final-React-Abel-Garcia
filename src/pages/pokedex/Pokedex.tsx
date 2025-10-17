import { useEffect, useState } from "react";
import { type PokemonDetailed } from "../../../src/assets/utils/Interfaces.ts";
import { useParams } from "react-router-dom";
import { type PokedexParams } from "../../../src/assets/utils/Interfaces.ts";
const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
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
    // Llenar con las 4 estadísticas principales
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

  // Si aún no tenemos 8, rellenar con un placeholder (poco probable en Pokémon)
  while (casilleroData.length < 8) {
    casilleroData.push({ label: "Dato", value: "N/A" });
  }
  return (
    <>
      <div className="contenedor-principal">
        <header className="grid-header">
          {/* Título: Nombre y ID del Pokémon */}
          <h1>{capitalize(PokemonDetail.name)}</h1>
        </header>

        <div className="grid-imagen">
          {/* Imagen del Pokémon */}
          <img src={imageUrl} alt={`Arte oficial de ${PokemonDetail.name}`} />
        </div>

        <div className="grid-datos">
          {/* Renderizar los 8 casilleros con los datos extraídos */}
          {casilleroData.map((data, index) => (
            <div key={index} className="casillero">
              <strong>{data.label}:</strong> {data.value}
            </div>
          ))}
        </div>
      </div>
      <Box sx={{ width: "100%" }}>
        <LinearProgress />
        <label htmlFor="descarga">Progreso de la descarga:</label>
        <progress id="descarga" value="75" max="100">
          75%
        </progress>
        <label htmlFor="ataque">Ataque Base:</label>
        <meter id="ataque" value="244" min="0" max="255">
          244/255
        </meter>
      </Box>
    </>
  );
}
