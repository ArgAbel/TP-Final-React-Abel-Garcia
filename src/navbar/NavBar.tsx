import { Link } from 'react-router-dom'; 
import { NavLink } from 'react-router-dom'; 
import './navbar.css'; 
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';

const navItems = [
    { path: 'Index', label: 'Inicio' },
    { path: 'Pokedex', label: 'Vista detallada' },
    { path: 'Pokekards', label: 'Pokemons' },
];
function NavBar() {
   const [isMenuOpen, setIsMenuOpen] = useState(false);
    const handleMenuToggle = () => {
        setIsMenuOpen((prev) => !prev);
    };

  return (<>   
 
    <Box className='app-bar-container' sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
            <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
             onClick={handleMenuToggle}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            
          </Typography>
          <img src="src/assets/logo_pokemon-removebg-preview.png" className="pkimage" alt="logo pokemon" />
           <div className={`nav-menu-wrapper ${isMenuOpen ? 'visible' : 'hidden'}`}>
                        <ul className="ulclass">
                            {navItems.map((item) => (
                                // Al hacer clic, navegamos y cerramos el menú
                                <li key={item.path} onClick={handleMenuToggle}> 
                                    <NavLink 
                                        to={item.path} 
                                        className={({ isActive }) => `menu-nav-link ${isActive ? 'active' : ''}`}
                                    >
                                        {item.label}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>
         
        </Toolbar>
      </AppBar>
    </Box>;
  

    <div className="nav-container">
      <img src="src/assets/logo_pokemon-removebg-preview.png" className="pkimage" alt="logo pokemon" />
    <ul className="ulclass">
        <li className="nav-link"><Link to='Index' >INICIO</Link>   </li>
        <li className="nav-link"> <Link to='Pokedex' >DETALLES</Link>  </li>
        <li className="nav-link">  <Link to='Pokekards' >POKEMONS</Link> </li>
    </ul>
      </div>
    </>
  )}export default NavBar;
      

