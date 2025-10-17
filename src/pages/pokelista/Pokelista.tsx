import { useSelector, useDispatch } from "react-redux";
import { fetchPokemons } from "../../assets/store/CardSlice.ts";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useFavActions } from "../../hooks/useHook.ts";

import { type RootState, type AppDispatch } from "../../assets/store/index.ts";
import { type CardPokemon } from "../../assets/utils/Interfaces.ts";

import { Box, CardMedia } from "@mui/material";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import { Button } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import "./pokekards.css";

const ListaPokes = () => {
  const dispatch = useDispatch<AppDispatch>();

  // Selectores para la lista principal
  const {
    list: Pokes,
    loading,
    error,
    hasMore,
  } = useSelector((state: RootState) => state.CardPokemon);
  const { offset } = useSelector((state: RootState) => state.CardPokemon);

  // Lógica de Carga y Paginación
  useEffect(() => {
    if (Pokes.length === 0 && !loading) {
      dispatch(fetchPokemons(0));
    }
  }, [dispatch, Pokes.length, loading]);

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      dispatch(fetchPokemons(offset));
    }
  };

  // Lógica de Navegación
  const navigate = useNavigate();
  const handleViewDetails = (pokemonId: number) => {
    navigate(`/pokemon/${pokemonId}`);
  };

  // componente agregado para poder usar el hook, ya que no se puede usar un hook dentro de un map

  const PokemonCardItem: React.FC<{ pokemon: CardPokemon }> = ({ pokemon }) => {
    //Llamada al hook en el nivel superior de un componente de función
    const { isFavorite, handleToggleFavorite } = useFavActions(pokemon);

    return (
      <Card key={pokemon.id} sx={{ maxWidth: 345, width: "100%" }}>
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
          subheader={pokemon.types.map((t) => t.type.name).join(", ")}
        />

        <CardMedia
          component="img"
          image={
            pokemon.images || "src/assets/logo_pokemon-removebg-preview.png"
          }
          sx={{ height: 300, objectFit: "contain" }}
          title={`Sprite de ${pokemon.name}`}
        />

        <CardContent sx={{ pt: 1, textAlign: "center" }}>
          <Typography variant="body2" color="text.secondary">
            ID: #{pokemon.id}
          </Typography>
        </CardContent>

        <CardActions disableSpacing sx={{ p: 1.5 }}>
          {/* Uso de la lógica del hook */}
          <IconButton
            aria-label="add to favorites"
            onClick={handleToggleFavorite}
          >
            {/* El ícono cambia según el estado de Redux */}
            <FavoriteIcon color={isFavorite ? "error" : "action"} />
          </IconButton>
        </CardActions>
        <Button
          variant="contained"
          onClick={() => handleViewDetails(pokemon.id)}
        >
          Ver Detalles
        </Button>
      </Card>
    );
  };
  return (
    <>
      {error && (
        <Typography color="error" variant="h6" align="center">
          Error al cargar: {error}
        </Typography>
      )}
      {loading && Pokes.length === 0 ? (
        <Typography variant="h5" align="center">
          Cargando Pokémons...
        </Typography>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 3,
            justifyContent: "center",
            p: 2,
          }}
        >
          {Pokes.map((pokemon: CardPokemon) => (
            //Renderizamos el componente anidado
            <PokemonCardItem key={pokemon.id} pokemon={pokemon} />
          ))}
        </Box>
      )}

      <Box sx={{ display: "flex", justifyContent: "center", my: 3 }}>
        {Pokes.length > 0 && !loading && (
          <button onClick={handleLoadMore}>Cargar más</button>
        )}
        {loading && Pokes.length > 0 && (
          <Typography align="center">Cargando siguientes...</Typography>
        )}
      </Box>
    </>
  );
};

export default ListaPokes;
