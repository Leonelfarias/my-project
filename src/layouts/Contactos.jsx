import React from 'react'
import Header from '../components/estaticos/Header'
import Footer from '../components/estaticos/Footer'

const Contactos = ({cart, borrarProducto, vaciarCarrito}) => {
  return (
    <div>
      <Header borrarProducto={borrarProducto} cartItems={cart} vaciarCarrito={vaciarCarrito}/>
      <h1>Contactos</h1>
      <Footer />    
     </div>
  )
}

export default Contactos