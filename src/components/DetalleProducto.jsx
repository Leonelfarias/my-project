import React from 'react'
import { useParams, Navigate } from 'react-router-dom'

const Producto = ({ productos, agregarCarrito }) => {
  const { id } = useParams()

  if (productos.length === 0) {
    return <p>Cargando producto...</p> // Mientras se cargan los datos
  }

  const producto = productos.find(p => p.id === parseInt(id))

  if (!producto) {
    return <Navigate to="*" /> // Producto no encontrado
  }
  
  
  return (
    <div className="detalle-producto">
      <h2>{producto.nombre}</h2>
      <img src={producto.imagen} alt={producto.nombre} />
      <p>{producto.descripcion}</p>
      <p>Marca: {producto.marca}</p>
      <p>Categoría: {producto.categoria}</p>
      <p>Precio: ${producto.precio}</p>
      <p>Stock disponible: {producto.stock}</p>
      <button onClick={() => agregarCarrito({ ...producto, cantidad: 1 })}>Agregar al carrito</button>
    </div>
  )
}

export default Producto