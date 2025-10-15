import './favoritos.css';
import { type CardPokemon } from '../../assets/utils/Interfaces.ts'; 
import { useAppSelector } from '../../hooks/useHook.ts';
//import Button from '@mui/material/Button';
//import { useFavActions } from '../../hooks/useHook.ts';
 

 function Favorito() {
    const Favoritos = useAppSelector(state => state.Favoritos); 
  console.log('ESTADO ACTUAL DE FAVORITOS:', Favoritos);
  
    return (<>
    <div>Favoritos</div>
    {Favoritos.map((fav: CardPokemon) => (
      <div key={fav.id}>
        <span>{fav.name}</span>
       {fav.sprites.front_default && (
                            <img 
                                src={fav.sprites.front_default} 
                                alt={`Sprite de ${fav.name}`} 
                                style={{ width: '96px', height: '96px' }} 
                            />
                        )}
             
      </div>
    ))}
    <ul>
      {Favoritos.map((fav: CardPokemon) => (
        <li key={fav.id}>{fav.name}</li>
      ))}
    </ul>
  </>  
)}
export default Favorito;