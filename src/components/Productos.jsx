import React , {useState, useContext}from 'react'
import './styleProductos.css'
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const Productos = ({producto}) => {

  const {handleAddToCart } = useContext(CartContext)
  const [cantidad, setCantidad] = useState(producto.cantidad);

  const increase = () => setCantidad(prev => (prev < producto.stock ? prev + 1 : prev));
  const decrease = () => setCantidad(prev => (prev > 1 ? prev - 1 : 1));
 
 
    return (
      <section className="product-card">
          <picture className='imgContainer'>
              <img src={producto.imagen} alt="imagen" className="product-img" />
          </picture>

          <h3 className="product-name">{producto.nombre}</h3>
          <p className="product-desc">{producto.descripcion}.</p>
          <p className="product-marca">{producto.marca}</p>
          <p className="product-desc">{producto.categoria}.</p>
          <p className="product-price">${producto.precio}</p>
          <p className="product-stock">Stock: {producto.stock}</p>
          <div className='cantidadContainer'>
              <button className='qtyButton' onClick={decrease}>-</button>
              <span>{cantidad}</span>
              <button className='qtyButton' onClick={increase}>+</button>
          </div>

          <button style={{display: cantidad == 0 ? 'none' : 'block'}} onClick={()=> handleAddToCart({...producto, cantidad:cantidad})}>Agregar al carrito</button>

          <Link to={`/productos/${producto.id}`}>Ver más</Link>
      </section>
      
      
  )
}

export default Productos