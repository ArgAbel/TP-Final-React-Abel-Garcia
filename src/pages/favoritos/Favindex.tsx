import './favoritos.css';
import { type CardPokemon } from '../../assets/utils/Interfaces.ts'; 
import { useAppSelector } from '../../hooks/useHook.ts';
import Button from '@mui/material/Button';
import { useFavActions } from '../../hooks/useHook.ts';
 

 function Favoritos() {
    const Favoritos = useAppSelector(state => state.Favoritos); 
    const { add, borrarFav } = useFavActions();
    const pokemonDePrueba: CardPokemon = {
        id: 9999, 
        name: "SQUIRTLE DE PRUEBA",
        sprites: { front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png" },
        types: [], // Rellena con valores si son obligatorios en CardPokemon
    };
    return (<>
     <button 
                onClick={() => add(pokemonDePrueba)}
                className="btn-test-add"
                style={{ marginBottom: '20px', padding: '10px', backgroundColor: '#4CAF50', color: 'white' }}
            ></button>
    <div>Favoritos</div>
    {Favoritos.map((fav: CardPokemon) => (
      <div key={fav.id}>
        <span>{fav.name}</span>
        <Button variant="contained" onClick={() => add(fav)}>agregar</Button>
<Button variant="contained" onClick={() => borrarFav(fav.id)}>borrar</Button>
      
      </div>
    ))}
    <ul>
      {Favoritos.map((fav: CardPokemon) => (
        <li key={fav.id}>{fav.name}</li>
      ))}
    </ul>
  </>  
)}
export default Favoritos;