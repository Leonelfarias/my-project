import React, { useContext } from 'react';
import Header from '../components/estaticos/Header';
import Footer from '../components/estaticos/Footer';
import ProductList from '../components/ProductList';
import loading from '../assets/loading.gif';
import { CartContext } from '../context/CartContext';

const GaleriaDeProductos = () => {
  const {
    productos = [],
    cargando,
    cart,
    agregarCarrito,
    borrarProducto,
    vaciarCarrito,
  } = useContext(CartContext);

  return (
    <>
      <Header
        borrarProducto={borrarProducto}
        cartItems={cart}
        vaciarCarrito={vaciarCarrito}
      />

      <h1 style={{ textAlign: 'center', marginTop: '20px' }}>
        Galería de Productos
      </h1>

      {cargando ? (
        <img src={loading} alt="loading" />
      ) : (
        <>
          {productos.length > 0 ? (
            <ProductList productos={productos} agregarCarrito={agregarCarrito} />
          ) : (
            <p style={{ textAlign: 'center' }}>No hay productos para mostrar.</p>
          )}
        </>
      )}

      <Footer />
    </>
  );
};

export default GaleriaDeProductos;