import { Route, Routes } from "react-router-dom";
import NavBar from "./navbar/NavBar";
import { Pokedex } from "./pages/pokedex/Pokedex";
import Index from "./pages/index/Index";
import Favoritos from "./pages/favoritos/Favindex.tsx";
import ListaPokes from "./pages/pokelista/Pokelista.tsx";

function App() {
  return (
    <>
      <NavBar />

      <Routes>
        <Route path="/ListaPokes" element={<ListaPokes />} />
        <Route path="/pokemon/:id" element={<Pokedex />} />
        <Route path="/*" element={<h1>Not Found</h1>} />
        <Route path="/index" element={<Index />} />
        <Route path="/" element={<Index />} />
        <Route path="/Favoritos" element={<Favoritos />} />
      </Routes>
    </>
  );
}

export default App;
