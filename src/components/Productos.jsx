import React, {useState} from 'react'
import './styleProductos.css'

const Productos = ({producto, agregarCarrito}) => {

const [cantidad, setCantidad] = useState(1);

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

          <button onClick={() => agregarCarrito({ ...producto, cantidad })}>Agregar al carrito</button>
      </section>
  )
}

export default Productos