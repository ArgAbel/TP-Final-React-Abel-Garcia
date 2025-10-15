import { useEffect,useState } from "react"  
import { type PokemonDetailed } from '../../../src/assets/utils/Interfaces.ts';

import { useParams } from 'react-router-dom';
import { type Params } from 'react-router-dom';

import { useFavActions } from '../../hooks/useHook.ts';
import { useAppSelector } from '../../hooks/useHook.ts';
import Button from '@mui/material/Button';


export function Pokedex() {
  const Favoritos = useAppSelector(state => state.Favoritos); 
    const { add, borrarFav } = useFavActions();
  // TypeScript necesita que tipemos el objeto que retorna useParams
  const { id } = useParams<Params>();
  const pokemonId = id; // Accedes al valor 'id'
  const [PokemonDetail, setPokemonDetail] = useState<PokemonDetailed | null>(null);
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
                    throw new Error(`Error ${response.status}: Fallo al obtener el Pokémon ${pokemonId}`);
                }
                  const data: PokemonDetailed = await response.json();
                setPokemonDetail(data);
} catch (err) {
                // Usamos el error de la promesa o un mensaje genérico
                setError((err as Error).message || "Fallo desconocido al cargar detalles.");
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
    
  return (
    <>
     <button 
                className="btn-test-add"
                style={{ marginBottom: '20px', padding: '10px', backgroundColor: '#4CAF50', color: 'white' }}
            ></button>
            <Button variant="contained" >agregar</Button>

<h1>aca estoy</h1>
    <ul>
      <li>{PokemonDetail.id}</li>
      <li>{PokemonDetail.weight}</li>
      <li>{PokemonDetail.height}</li>
    </ul>
    <h1>pagina pokedex</h1>
      
    </>
  );
}; export default Pokedex;