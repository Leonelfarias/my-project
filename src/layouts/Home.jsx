import React, { useContext } from 'react';
import Header from '../components/estaticos/Header';
import Footer from '../components/estaticos/Footer';
import ProductList from '../components/ProductList';
import { CartContext } from '../context/CartContext';

const Home = () => {
  const { productos, cargando } = useContext(CartContext);

  // Selecciono las 20 ofertas más baratas
  const ofertas = [...productos]
    .sort((a, b) => a.precio - b.precio)
    .slice(0, 20);

  return (
    <>
      <Header />

      <main className="home-main">
        <h1>Bienvenidos a mi tienda</h1>
        <h2>“Herramientas de calidad para profesionales y entusiastas”</h2>

        <p>
          En nuestra tienda vas a encontrar herramientas seleccionadas por su <strong>calidad y durabilidad</strong>. 
          Equipate como un profesional, al mejor precio.
        </p>

        <h3>🔥 20 Ofertas destacadas</h3>

        {cargando ? (
          <p>Cargando productos...</p>
        ) : (
          <ProductList productos={ofertas} />
        )}
      </main>

      <Footer />
    </>
  );
};

export default Home;