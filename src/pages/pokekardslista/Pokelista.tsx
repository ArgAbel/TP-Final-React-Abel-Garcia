
import { useSelector } from 'react-redux';
import { fetchPokemons } from '../../assets/store/CardSlice.ts'; // Ajusta esta ruta a tu slice/thunk
import { type RootState} from '../../assets/store/index.ts'; // Ajusta esta ruta a tus tipos de Redux
// import { type Pokemon, type PokemonState } from '../utils/Interfaces';// 2. Tipo para el estado completo del slice
import { useNavigate } from 'react-router-dom'; 

import { type CardPokemon} from '../../assets/utils/Interfaces.ts';
import { useEffect,useState } from "react"  



import { styled } from '@mui/material/styles';
import { Box, CardMedia } from '@mui/material';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import { Button } from '@mui/material';

import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';

import Avatar from '@mui/material/Avatar';
import IconButton, {type IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import './pokekards.css'; 
import { useDispatch } from 'react-redux';
import { type AppDispatch } from '../../assets/store/index.ts';

import { useFavActions } from '../../hooks/useHook.ts';


///esto es para borrar probablemente
interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}
const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));


function ListaPokes(){
    const dispatch = useDispatch<AppDispatch>();
    const { add, borrarFav } = useFavActions();
   
    const handleAddFavorite = (pokemon: CardPokemon) => {
     add(pokemon);
     console.log('lo agregue')
     console.log({pokemon});
};

  const { list: Pokes, loading, error, hasMore } = useSelector((state: RootState) => state.CardPokemon);
  const { offset } = useSelector((state: RootState) => state.CardPokemon);
  useEffect(() => {
    // Solo carga si no hay pokemons y no está cargando (para evitar doble carga inicial)
    if (Pokes.length === 0 && !loading) {
      dispatch(fetchPokemons(0));
    }
  }, [dispatch, Pokes.length, loading]);
   const [expandedStates, setExpandedStates] = useState<Record<number, boolean>>({});

  const handleExpandClick = (id: number) => {
    setExpandedStates(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

   const handleLoadMore = () => {
    // Solo despacha si no está cargando y si hay más pokémons disponibles
    if (!loading && hasMore) {
        dispatch(fetchPokemons(offset));
    }
  };
   const navigate = useNavigate();
    const handleViewDetails = (pokemonId: number) => {
        // 2. Usar navigate para enviar al usuario a la ruta dinámica
        // La ruta "/pokemon/" debe coincidir con la definida en tu <Route>
        navigate(`/pokemon/${pokemonId}`); 
    };

return (
  <>
   {error && (
        <Typography color="error" variant="h6" align="center">
          Error al cargar: {error}
        </Typography>
      )}
    {loading && Pokes.length === 0 ? (
        <Typography variant="h5" align="center">Cargando Pokémons...</Typography>
      ) : (
        // Mapeamos los datos de Pokémon
        <Box 
          sx={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: 3, 
            justifyContent: 'center', 
            p: 2 // Padding adicional
          }}
        >
          {Pokes.map((pokemon: CardPokemon) => {
            const isExpanded = expandedStates[pokemon.id] || false; // Estado de expansión para este Pokémon

            return (
              <Card key={pokemon.id} sx={{ maxWidth: 345, width: '100%' }}>
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="pokemon-avatar">
                      {pokemon.id}
                    </Avatar>
                  }
                  action={
                    <IconButton aria-label="settings">
                      <MoreVertIcon />
                    </IconButton>
                  }
                  title={pokemon.name.toUpperCase()}
                  // El tipo `types` ya está en `CardPokemon`, no es necesario castear con `t: PokemonSlotType` aquí
                  subheader={pokemon.types.map((t) => t.type.name).join(', ')}
                /> 
                
                {/* 💡 Corregida la ruta de la imagen de fallback y uso de `images` o `sprites` */}
                <CardMedia
                  component="img"
                  // Usamos 'images' si es un string (como en tu thunk) o 'sprites.front_default' si no lo es.
                  image={  pokemon.images || 'src/assets/logo_pokemon-removebg-preview.png'} 
                  sx={{ 
                      height: 300, 
                      objectFit:'contain',
                  }}
                  title={`Sprite de ${pokemon.name}`} 
                /> 
                
                <CardContent sx={{ pt: 1, textAlign: 'center' }}>
                    <Typography variant="body2" color="text.secondary">
                        ID: #{pokemon.id}
                    </Typography>
                </CardContent>
                
                <CardActions disableSpacing sx={{ p: 1.5 }}>
                  <IconButton aria-label="add to favorites"    onClick={() => handleAddFavorite(pokemon)}>
                    <FavoriteIcon />
                  </IconButton>
                 </CardActions>
                 <Button variant="contained" onClick={() => handleViewDetails(pokemon.id)}>Ver Detalles</Button>
              </Card>
           );
           })}
           </Box>
      )}
      {/* Botón para cargar más (paginación) */}
      <Box sx={{ display: 'flex', justifyContent: 'center', my: 3 }}>
        {Pokes.length > 0 && !loading && <button onClick={handleLoadMore}>Cargar más</button>}
        {loading && Pokes.length > 0 && <Typography align="center">Cargando siguientes...</Typography>}
      </Box>
    </>
  );
}

export default ListaPokes;
