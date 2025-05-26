import React from "react";
import "./style/NotFound.css";

const NotFound = () => {
  return (
    <div className="notfound-container">
      <div className="notfound-content">
        <h1 className="notfound-title">404</h1>
        <p className="notfound-subtitle">Ups... Producto no encontrado</p>
        <p className="notfound-text">Parece que la herramienta no fue encontrada... paciencia</p>
        <a href="/" className="notfound-button">Volver a la tienda</a>
      </div>
    </div>
  );
};

export default NotFound;