import { Link } from 'react-router-dom';
import './navbar.css'; // ⬅️ Importamos los estilos

/* // 🗺️ Definición de los enlaces de la barra de navegación
const navItems = [
  { path: '/pokedex', label: 'PokéDex', color: '#1a75ff' }, // Azul
  { path: '/my-team', label: 'My Team', color: '#ff4d4d' },    // Rojo
  { path: '/battles', label: 'Battles', color: '#66cc99' },    // Verde
  { path: '/profile', label: 'Profile', color: '#ffd966' },  // Amarillo
];

// ---------------------------------------------------- */

function NavBar() {
  return (
    <nav className="nav-container">
    <ul className="ulclass">
        <li className="nav-link"><Link to='Index' >inicio</Link>   </li>
        <li className="nav-link"> <Link to='Pokedex' >Vista detallada</Link>  </li>
        <li className="nav-link">  <Link to='Pokekards' >Pokemons</Link> </li>
        
    </ul>
      </nav>
  )}export default NavBar;
      

/* export const NavBar: React.FC = () => {
  return (
    <nav className="nav-container">
     */
      
       /*  // El contenedor no es estrictamente necesario, pero ayuda a la organización
        <div key={item.path} className="nav-item">
          <NavLink
            to={item.path}
            className="nav-link"
            // Asignamos la variable CSS '--indicator-color' para el color de la línea
            style={{ 
              '--indicator-color': item.color, 
            } as React.CSSProperties} // Tipado para aceptar variables CSS
          >
            {item.label}
          </NavLink>
        </div>
      ))}
    </> */
