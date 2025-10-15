import { useEffect,useState } from "react"  
import { type CardPokemon } from '../../assets/utils/Interfaces.ts';
import {type PokemonSlotType } from '../../assets/utils/Interfaces.ts'; 
import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Box, CardMedia } from '@mui/material';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import {type ApiPokemonDetail} from '../../assets/utils/Interfaces.ts'; 

import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, {type IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import './pokekards.css'; 
interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}
const BASE = 'https://pokeapi.co/api/v2';

function Pokekards() {
  // Estado inicial tipado como un array de CardPokemon
  const [Pokes, setPokes] = useState<CardPokemon[]>([]);

  useEffect(() => {
    // Función asíncrona para manejar la lógica de fetching
    
    const fetchPokemonData = (): void => {
      
      // 1. Primer fetch para obtener la lista inicial 
      fetch(`${BASE}/pokemon?limit=20`) 
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Error ${response.status}: Failed to fetch Pokemon list`);
          }
          return response.json();
                  })
        
        .then((data: { results: { url: string }[] }) => {
          // 2. Crear y tipar el array de Promesas
          const detailPromises: Promise<ApiPokemonDetail>[] = data.results.map((pokemon) =>
            fetch(pokemon.url)
              .then(res => res.json()) 
               );
               return Promise.all(detailPromises);
          
        })
        
        // 4. Recibir y tipar los resultados detallados
        .then((detailedResults: ApiPokemonDetail[]) => {
          // 5. Mapear los resultados al formato CardPokemon
          const formattedPokes: CardPokemon[] = detailedResults.map((details) => ({
            id: details.id,
            name: details.name,
            sprites: {front_default: details.sprites.other?.['official-artwork']?.front_default 
              || details.sprites.front_default ||'' 
            },
            // Extraer solo los nombres de los tipos
             
            types: details.types as PokemonSlotType[], 
          }));
          
          // 6. Actualizar el estado
          setPokes(formattedPokes);
        })
        
        // 7. Manejo centralizado de errores
        .catch((error: Error) => {
          console.error('Error al obtener datos de Pokémon:', error.message);
        });
    };
    fetchPokemonData();
    // Array de dependencias vacío: se ejecuta solo una vez al montar el componente
  }, []); 
  //componentes y logica de mui component 
  const [expanded, setExpanded] = React.useState(true);

  // 🐛 DEBUGGING: Comprobación simple de la URL del primer Pokémon
  if (Pokes.length > 0) {
      console.log('URL de la imagen del primer Pokémon:', Pokes[0].sprites?.front_default);
  }
      const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
   transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
}));
const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
  // 1. Usa el Fragment <> para devolver el contenido.
  <>
    {/* 2. Comprobación de carga */}
    {Pokes.length === 0 ? (
      <Typography variant="h5" align="center">Cargando Pokémons...</Typography>
    ) : (
      // 3. Mapeamos directamente los datos de Pokémon a sus propias Cards
      <Box 
          // Opcional: usar Box o Grid para un buen layout
          sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, justifyContent: 'center' }}
      >
        {Pokes.map((pokemon) => (
          // 4. Cada Pokémon debe ser su propia Card
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
              subheader={pokemon.types.map((t: PokemonSlotType) => t.type.name).join(', ')}
            />   
           <CardMedia
        component="img"
        image={pokemon.sprites?.front_default || 'src/assets/logo_pokemon-removebg-preview.png'}
        sx={{ 
            height: 300, // Alto fijo para asegurar visibilidad
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
              <IconButton aria-label="add to favorites">
                <FavoriteIcon />
              </IconButton>
              <IconButton aria-label="share">
                <ShareIcon />
              </IconButton>
              
              <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </ExpandMore>
            </CardActions>
            
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography>Detalles y Estadísticas del Pokémon...</Typography>
              </CardContent>
            </Collapse>
          </Card>
        ))}
      </Box>
    )}
  </>
);
}
export default Pokekards;