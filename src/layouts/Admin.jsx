import React, { useState, useContext } from "react";
import FormularioProducto from "../components/FormularioProducto";
import FormularioEdicion from "../components/FormularioEdicion";
import { AdminContext } from "../context/AdminContext";
import { useAuth } from '../context/AuthContext';
import Header from '../../src/components/estaticos/Header';
import './style/styleAdmin.css';

const Admin = () => {
    const {
        productos,
        loading,
        agregarProducto,
        actulizarProducto,
        eliminarProducto
    } = useContext(AdminContext);

    const [openForm, setOpenForm] = useState(false);
    const [openEditor, setOpenEditor] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const handleAddProduct = (newProduct) => {
        agregarProducto(newProduct);
        setOpenForm(false);
        setOpenEditor(false); // Cierra ambos formularios
    };

    const handleEditProduct = (updatedProduct) => {
        actulizarProducto(updatedProduct);
        setOpenEditor(false);
        setOpenForm(false); // Cierra ambos formularios
    };

    return (
        <div className="admin-container">
            <Header />
            
            <div className="admin-header">
                <h1 className="title">Panel Administrativo</h1>
                <button 
                    className="add-product-btn"
                    onClick={() => {
                        setOpenForm(true);
                        setOpenEditor(false);
                    }}
                >
                    Agregar Producto Nuevo
                </button>
            </div>

            {/* Formulario Flotante para Agregar Producto */}
            {openForm && (
                <div className="form-modal">
                    <div className="form-content">
                        <button 
                            className="close-btn" 
                            onClick={() => setOpenForm(false)}
                        >
                            ✖
                        </button>
                        <FormularioProducto 
                            onAgregar={handleAddProduct} 
                            onCancel={() => setOpenForm(false)}
                        />
                    </div>
                </div>
            )}

            {/* Formulario Flotante para Editar Producto */}
            {openEditor && (
                <div className="form-modal">
                    <div className="form-content">
                        <button 
                            className="close-btn" 
                            onClick={() => setOpenEditor(false)}
                        >
                            ✖
                        </button>
                        <FormularioEdicion
                            productoSeleccionado={selectedProduct}
                            onActualizar={handleEditProduct}
                            onCancel={() => setOpenEditor(false)}
                        />
                    </div>
                </div>
            )}

            {/* Lista de Productos */}
            {loading ? (
                <p>Cargando...</p>
            ) : (
                <div className="products-grid">
                    {productos.map((product) => (
                        <div key={product.id} className="product-card">
                            <img
                                src={product.imagen}
                                alt={product.nombre}
                                className="product-image"
                            />
                            <div className="product-info">
                                <h3>{product.nombre}</h3>
                                <p>${product.precio}</p>
                                <div className="product-actions">
                                    <button
                                        className="edit-btn"
                                        onClick={() => {
                                            setSelectedProduct(product);
                                            setOpenEditor(true);
                                            setOpenForm(false);
                                        }}
                                    >
                                        Editar
                                    </button>
                                    <button
                                        className="delete-btn"
                                        onClick={() => eliminarProducto(product.id)}
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Admin;