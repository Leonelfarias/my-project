import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './styleEstatico.css';
import Cart from '../Cart';
import logoDBZ from '../../assets/logopage.png';
import { useAuth } from '../../context/AuthContext';
import { FaShoppingCart, FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';

const Header = () => {
  const { isAuth, userData, logout } = useAuth();
  const [isCartOpen, setCartOpen] = useState(false);

  const isAdmin = isAuth && userData?.role === 'admin';

  return (
    <header>
      <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
        <div className="container-fluid">
          {/* Logo */}
          <NavLink className="navbar-brand logo" to="/">
            <img src={logoDBZ} alt="Dragon Ball Z Logo" style={{ height: '40px' }} />
          </NavLink>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

              {/* Si es admin solo mostrar Panel */}
              {isAdmin ? (
                <>
                  <li className="nav-item">
                    <NavLink className="link" to="/admin">Panel</NavLink>
                  </li>
                  <li className="nav-item d-flex align-items-center gap-2">
                    <span className="text-light">{userData.email || 'Admin'}</span>
                    <button
                      onClick={logout}
                      className="link"
                      style={{ background: 'none', border: 'none' }}
                      title="Cerrar sesión"
                    >
                      <FaSignOutAlt color="red" />
                    </button>
                  </li>
                </>
              ) : (
                // Si no es admin (cliente o no logueado)
                <>
                  <li className="nav-item">
                    <NavLink className="link" to="/">Inicio</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="link" to="/acercade">Sobre nosotros</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="link" to="/productos">Productos</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="link" to="/contacto">Contacto</NavLink>
                  </li>

                  {/* Carrito visible para todos */}
                  <li className="nav-item">
                    <button
                      className="btnCart link"
                      onClick={() => setCartOpen(true)}
                      style={{ background: 'none', border: 'none' }}
                      title="Ver carrito"
                    >
                      <FaShoppingCart color='red' />
                    </button>
                    <Cart isOpen={isCartOpen} onClose={() => setCartOpen(false)} />
                  </li>

                  {/* Estado de autenticación */}
                  <li className="nav-item">
                    {isAuth ? (
                      <div className="d-flex align-items-center gap-2">
                        <span className="text-light">{userData?.email || 'Usuario'}</span>
                        <button
                          onClick={logout}
                          className="link"
                          style={{ background: 'none', border: 'none' }}
                          title="Cerrar sesión"
                        >
                          <FaSignOutAlt color="red" />
                        </button>
                      </div>
                    ) : (
                      <div className="d-flex align-items-center gap-2">
                        <span className="text-light">Sin usuario</span>
                        <NavLink className="link" to="/login" title="Iniciar sesión">
                          <FaSignInAlt color="red" />
                        </NavLink>
                      </div>
                    )}
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;