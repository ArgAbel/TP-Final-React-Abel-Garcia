import { useDispatch, useSelector} from 'react-redux';
import { type TypedUseSelectorHook } from 'react-redux';
import { type RootState, type AppDispatch } from '../assets/store/index.ts'; // Ajusta la ruta
import  { addFav } from '../assets/store/FavSlices.ts';   
import { deleteFav } from '../assets/store/FavSlices.ts';  

import { type CardPokemon } from '../assets/utils/Interfaces.ts';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useFavActions = (pokemon: CardPokemon) => {
  const dispatch = useAppDispatch();
  
  const isFavorite = useAppSelector(state => 
    state.Favoritos.some(fav => fav.id === pokemon.id)
  );
//usa CardPokemon para solucionar inconsistencia entre lo que espera recibir y recibe
  const borrarFav = () => {
    dispatch(deleteFav(pokemon));
  };

  const add = () => {
     console.log('2. Despachando addFav con:', pokemon.name); 
    dispatch(addFav(pokemon));
  };
  const handleToggleFavorite = () => {
        if (isFavorite) {
            borrarFav();
        } else {
            add();
        }
    };
  
   return { borrarFav, add ,isFavorite, handleToggleFavorite}
  }