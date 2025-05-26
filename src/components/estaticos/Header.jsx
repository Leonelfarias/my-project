import React,{useState, useContext} from 'react'
import { Link, Links, useNavigate } from 'react-router-dom'
import './styleEstatico.css'
import Cart from '../Cart'

import { AuthContext } from '../../context/AuthContext';

const Header = ({cartItems, borrarProducto, vaciarCarrito}) => {

const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

const [isCartOpen, setCartOpen] = useState(false)

const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/');
  };


  return (
    <header>
        <nav>
        <ul>
          <li><Link to='/' className='link'>Home</Link></li>
          <li><Link to='/acercade' className='link'>Sobre nosotros</Link></li>
          <li><Link to='/productos' className='link'>Galeria de productos</Link></li>
          <li><Link to='/contacto' className='link'>Contactos</Link></li>

          {/* Estado de sesión */}
          {isAuthenticated ? (
            <>
              <li><button className='btn-cerrar-sesion' onClick={handleLogout}>Cerrar sesión</button></li>
              <li><span className='estadoLogin'>Logueado ✅</span></li>
              
              <li><Link to='/panel' className='link'>Panel</Link></li>
            </>
          ) : (
            <>
              <li><Link to='/login' className='link'>Login</Link></li>
              <li><span className='estadoLogin'>No logueado ❌</span></li>
            </>
          )}
          <li>
            <button className='btnCart' onClick={() => setCartOpen(true)}><i className='fa-solid fa-cart-shopping'></i> </button> {/* mostrar cart */}
            <Cart borrarProducto={borrarProducto} vaciarCarrito={vaciarCarrito} cartItems={cartItems} isOpen={isCartOpen} onClose={() => setCartOpen(false)} />
          </li>
        </ul>
        </nav>
    </header>
  )
}

export default Header