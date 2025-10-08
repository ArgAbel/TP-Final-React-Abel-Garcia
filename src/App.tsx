
import { Route, Routes } from 'react-router-dom'
import NavBar from './navbar/NavBar';
import './App.css'
import { Pokedex } from './pages/pokedex/Pokedex';
import {PokeKards} from './pages/pokekards/Pokekards.tsx';
import Index from './pages/index/Index';


function App() {
return (
    <>
    <NavBar />
     <Routes>
     <Route path='/Pokedex' element={<Pokedex />} /> 
     <Route path='*' element={<h1>Not Found</h1>} />
     <Route path='/index' element={<Index />}  />
     <Route path='/PokeKards' element={<PokeKards />}  /> 
     </Routes>
     </>
   
  )
}

export default App
