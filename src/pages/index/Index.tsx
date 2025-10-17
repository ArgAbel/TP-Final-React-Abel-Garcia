import "./Subindex.css";

import Button from "@mui/material/Button";
import { CatchingPokemon } from "@mui/icons-material";
function Index() {
  return (
    <>
      <div className="contenedor-grid">
        <div className="header">
          <img
            src="src/assets/explorepokemonwordl-removed.png"
            className="imgh"
            alt=""
          />
        </div>

        <div className="buttontrasport">
          <Button
            variant="contained"
            endIcon={<CatchingPokemon sx={{ fontSize: 30, color: "red" }} />}
          >
            Go to Favourites!!
          </Button>
          <Button
            variant="contained"
            endIcon={<CatchingPokemon sx={{ fontSize: 40, color: "red" }} />}
          >
            Go To Catch em all!!
          </Button>
        </div>
        <div className="videointro">
          <iframe
            className="iframeres"
            src="https://www.youtube.com/embed/8RXz6Uru9WY?si=sbIdkfphpl4nOQ3z&autoplay=1&mute=1&playsinline=1"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      </div>
    </>
  );
}
export default Index;
