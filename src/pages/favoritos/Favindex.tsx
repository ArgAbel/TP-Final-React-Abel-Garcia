import { useNavigate } from "react-router-dom";
import { type CardPokemon } from "../../assets/utils/Interfaces.ts";
import { useAppSelector } from "../../hooks/useHook.ts";
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
import { useFavActions } from "../../hooks/useHook.ts";

function Favorito() {
  const Favoritos = useAppSelector((state) => state.Favoritos);
  console.log("ESTADO ACTUAL DE FAVORITOS:", Favoritos);

  const PokemonCardItem: React.FC<{ pokemon: CardPokemon }> = ({ pokemon }) => {
    const { isFavorite, handleToggleFavorite } = useFavActions(pokemon);
    const navigate = useNavigate();
    const handleViewDetails = (pokemonId: number) => {
      navigate(`/pokemon/${pokemonId}`);
    };
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
      <div className="favoritos-view-container">
        <Typography
          variant="h4"
          component="h1"
          align="center"
          sx={{ mt: 4, mb: 3 }}
        >
          Tus Pokémon Favoritos
        </Typography>

        {Favoritos.length === 0 ? (
          <Typography
            variant="h6"
            color="text.secondary"
            align="center"
            sx={{ p: 5 }}
          >
            No tienes Pokémon marcados como favoritos.
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
            {Favoritos.map((pokemon: CardPokemon) => (
              <PokemonCardItem key={pokemon.id} pokemon={pokemon} />
            ))}
          </Box>
        )}
      </div>
    </>
  );
}
export default Favorito;
