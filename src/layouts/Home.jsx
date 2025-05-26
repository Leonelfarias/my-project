import React from 'react'
import Header from '../components/estaticos/Header'
import Footer from '../components/estaticos/Footer'
import ProductList from '../components/ProductList'
import loading from '../assets/loading.gif'
import './style/styleHome.css'

const Home = ({cart, productos, cargando, agregarCarrito, borrarProducto, vaciarCarrito}) => {

 const ofertas = [...productos] // copio el array
  .sort((a, b) => a.precio - b.precio) // ordeno por precio ascendente
  .slice(0, 3); // tomo los 3 primeros => los más baratos

  return (
    <>
      <Header borrarProducto={borrarProducto} cartItems={cart} vaciarCarrito={vaciarCarrito}/>

        <main className="home-main">
        <h1>Bienvenidos a mi tienda</h1>
        <h2>“Herramientas de calidad para profesionales y entusiastas”</h2>

        <p className="intro-text">
          En nuestra tienda vas a encontrar herramientas seleccionadas por su <strong>calidad y durabilidad</strong>. 
          Equipate como un profesional, al mejor precio.
        </p>

        <h3>🔥 Ofertas destacadas</h3>

        {cargando ? (
          <img src={loading} alt='loading' />
        ) : (
          <div className="ofertas-container">
            {/*  <ProductList agregarCarrito={agregarCarrito} productos={productos}/>, todos los productos */}
            <ProductList agregarCarrito={agregarCarrito} productos={ofertas} /> {/* solo ofertas */}
          </div>
        )}
      </main>



      <Footer />
    </>
  )
}

export default Home