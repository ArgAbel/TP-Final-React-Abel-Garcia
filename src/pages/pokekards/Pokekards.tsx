//este puede mostrar las cartas con el tipe cardpokemon

import { useEffect,useState } from "react"  
import { type CardPokemon } from '../../../src/assets/utils/Interfaces.ts';

const BASE = 'https://pokeapi.co/api/v2';

function Pokekards() {
  // Estado inicial tipado como un array de CardPokemon
  const [Pokes, setPokes] = useState<CardPokemon[]>([]);

  useEffect(() => {
    // Función asíncrona para manejar la lógica de fetching
    
    const fetchPokemonData = (): void => {
      
      // 1. Primer fetch para obtener la lista inicial 
      fetch(`${BASE}/pokemon?limit=0`) 
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Error ${response.status}: Failed to fetch Pokemon list`);
          }
          return ( console.log("aca es el primero",response),
            response.json());
                  })
        
        .then((data: { results: { url: string }[] }) => {
          // 2. Crear y tipar el array de Promesas
          const detailPromises: Promise<CardPokemon>[] = data.results.map((pokemon) =>
            fetch(pokemon.url)
              .then(res => {
                console.log(res);
                return res.json();
              })
          );
          
          // 3. Devolver Promise.all para esperar todos los detalles
          return Promise.all(detailPromises);
          
        })
        
        // 4. Recibir y tipar los resultados detallados
        .then((detailedResults: CardPokemon[]) => {
          // 5. Mapear los resultados al formato CardPokemon
          const formattedPokes: CardPokemon[] = detailedResults.map((details) => ({
            id: details.id,
            name: details.name,
           sprites: details.sprites,
            // Extraer solo los nombres de los tipos
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            types: details.types.map((typeSlot: { type: any } ) => typeSlot.type.name),
          }));
          
          // 6. Actualizar el estado
          setPokes(formattedPokes);
        })
        
        // 7. Manejo centralizado de errores
        .catch((error: Error) => {
          console.error('Error al obtener datos de Pokémon:', error.message);
        });
    };
console.log(Pokes);
    fetchPokemonData();
    // Array de dependencias vacío: se ejecuta solo una vez al montar el componente
  }, []); 
  return (
    <div>
      {Pokes.map((poke) => (
        <div key={poke.id}>
          <strong>{poke.name}</strong>: {poke.types.join(', ')}
        </div>
      ))}
    </div>
  );
}

export default Pokekards;