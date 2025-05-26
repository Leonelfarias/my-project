import { useState, useEffect, useContext } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './layouts/Home';
import AcercaDe from './layouts/AcercaDe';
import Contactos from './layouts/Contactos';
import GaleriaDeProductos from './layouts/GaleriaDeProductos';
import DetalleProducto from './components/DetalleProducto';
import NotFound from './layouts/NotFound';
import RutaProtegida from './auth/RutasProtegidas';
import Login from './layouts/Login';
import { CartProvider, CartContext } from './context/CartContext';

function AppContent() {
  const {
    cart,
    handleAddToCart,
    handleDeleteFromCart,
    vaciarCarrito,
  } = useContext(CartContext);

  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem('token')
  );

  useEffect(() => {
    fetch('/data/data.json')
      .then((respuesta) => respuesta.json())
      .then((datos) => {
        setTimeout(() => {
          setProductos(datos);
          setCargando(false);
        }, 2000);
      })
      .catch((error) => {
        console.log('Error', error);
        setCargando(false);
        setError(true);
      });
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              agregarCarrito={handleAddToCart}
              borrarProducto={handleDeleteFromCart}
              vaciarCarrito={vaciarCarrito}
              cart={cart}
              productos={productos}
              cargando={cargando}
            />
          }
        />
        <Route
          path="/acercade"
          element={
            <AcercaDe
              agregarCarrito={handleAddToCart}
              borrarProducto={handleDeleteFromCart}
              vaciarCarrito={vaciarCarrito}
              cart={cart}
            />
          }
        />
        <Route
          path="/productos"
          element={
            <GaleriaDeProductos
              agregarCarrito={handleAddToCart}
              borrarProducto={handleDeleteFromCart}
              vaciarCarrito={vaciarCarrito}
              cart={cart}
              productos={productos}
              cargando={cargando}
            />
          }
        />
        <Route
          path="/contacto"
          element={
            <Contactos
              agregarCarrito={handleAddToCart}
              borrarProducto={handleDeleteFromCart}
              vaciarCarrito={vaciarCarrito}
              cart={cart}
            />
          }
        />
        <Route
          path="/productos/:id"
          element={
            <DetalleProducto
              productos={productos}
              agregarCarrito={handleAddToCart}
              borrarProducto={handleDeleteFromCart}
              vaciarCarrito={vaciarCarrito}
              cart={cart}
            />
          }
        />
        <Route
          path="/panel"
          element={
            <RutaProtegida isAuthenticated={isAuthenticated}>
              <div>
                <h2>Panel Privado</h2>
                <p>Solo visible si estás logueado</p>
              </div>
            </RutaProtegida>
          }
        />
        <Route
          path="/login"
          element={<Login setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}

export default App;