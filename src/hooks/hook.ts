import { useDispatch, useSelector} from 'react-redux';
import { type TypedUseSelectorHook } from 'react-redux';
import { type RootState, type AppDispatch } from '../assets/store/index.ts'; // Ajusta la ruta

// Usa el hook tipado de useDispatch en toda la aplicación
export const useAppDispatch: () => AppDispatch = useDispatch;

// Usa el hook tipado de useSelector en toda la aplicación
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;