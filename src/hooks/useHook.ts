import { useDispatch, useSelector} from 'react-redux';
import { type TypedUseSelectorHook } from 'react-redux';
import { type RootState, type AppDispatch } from '../assets/store/index.ts'; // Ajusta la ruta
import  { addFav } from '../assets/store/FavSlices.ts';   
import { deleteFav } from '../assets/store/FavSlices.ts';  
import { type CardPokemon } from '../assets/utils/Interfaces.ts';

// Usa el hook tipado de useDispatch en toda la aplicación
export const useAppDispatch: () => AppDispatch = useDispatch;

// Usa el hook tipado de useSelector en toda la aplicación
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useFavActions = () => {
  const dispatch = useAppDispatch();

  const borrarFav = (id: number) => {
    dispatch(deleteFav(id));
  };

  const add = (fav: CardPokemon) => {
     console.log('2. Despachando addFav con:', fav.name); 
    dispatch(addFav(fav));
  };
  return { borrarFav, add }}