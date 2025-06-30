import React, { useState } from 'react';
import Productos from './Productos';

const ITEMS_PER_PAGE = 5;

const ProductList = ({ productos, agregarCarrito }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [paginaActual, setPaginaActual] = useState(1);

  // Filtrado por nombre
  const productosFiltrados = productos.filter(producto =>
    producto.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Paginación
  const indiceUltimo = paginaActual * ITEMS_PER_PAGE;
  const indicePrimero = indiceUltimo - ITEMS_PER_PAGE;
  const productosActuales = productosFiltrados.slice(indicePrimero, indiceUltimo);
  const totalPaginas = Math.ceil(productosFiltrados.length / ITEMS_PER_PAGE);

  const handleAnterior = () => {
    if (paginaActual > 1) setPaginaActual(paginaActual - 1);
  };

  const handleSiguiente = () => {
    if (paginaActual < totalPaginas) setPaginaActual(paginaActual + 1);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setPaginaActual(1); // Reset página al cambiar búsqueda
  };

  return (
    <>
      <input
        type="text"
        placeholder="Buscar producto..."
        value={searchTerm}
        onChange={handleSearchChange}
        style={{ margin: '10px auto 20px', padding: '8px', width: '300px', display: 'block' }}
      />

      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly', gap: '10px' }}>
        {productosActuales.length > 0 ? (
          productosActuales.map(producto => (
            <Productos
              key={producto.id}
              producto={producto}
              agregarCarrito={agregarCarrito}
            />
          ))
        ) : (
          <p style={{ textAlign: 'center', width: '100%' }}>No se encontraron productos.</p>
        )}
      </div>

      {totalPaginas > 1 && (
        <div className="pagination" style={{ marginTop: '20px', textAlign: 'center' }}>
          <button onClick={handleAnterior} disabled={paginaActual === 1}>
            Anterior
          </button>
          <span style={{ margin: '0 10px' }}>
            Página {paginaActual} de {totalPaginas}
          </span>
          <button onClick={handleSiguiente} disabled={paginaActual === totalPaginas}>
            Siguiente
          </button>
        </div>
      )}
    </>
  );
};

export default ProductList;