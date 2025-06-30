import React, { useState } from 'react';

const FormularioProducto = ({ onAgregar, onCancel }) => {
    const [nombre, setNombre] = useState('');
    const [precio, setPrecio] = useState('');
    const [imagen, setImagen] = useState(null);
    const [preview, setPreview] = useState('');
    const [categoria, setCategoria] = useState('');
    const [descripcion, setDescripcion] = useState('');

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImagen(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Crear objeto FormData para enviar la imagen
        const formData = new FormData();
        formData.append('nombre', nombre);
        formData.append('precio', precio);
        formData.append('categoria', categoria);
        formData.append('descripcion', descripcion);
        if (imagen) {
            formData.append('imagen', imagen);
        }

        // Simulamos la creación del producto
        const nuevoProducto = {
            id: Date.now(),
            nombre,
            precio: parseFloat(precio),
            imagen: preview || 'https://via.placeholder.com/300x200?text=Sin+imagen',
            categoria,
            descripcion
        };

        onAgregar(nuevoProducto);
    };

    return (
        <form onSubmit={handleSubmit} className="product-form">
            <h2>Agregar Nuevo Producto</h2>
            
            <div className="form-group">
                <label>Nombre del Producto</label>
                <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                />
            </div>
            
            <div className="form-group">
                <label>Precio</label>
                <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={precio}
                    onChange={(e) => setPrecio(e.target.value)}
                    required
                />
            </div>
            
            <div className="form-group">
                <label>Imagen del Producto</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                />
                {preview && (
                    <div className="image-preview">
                        <img src={preview} alt="Vista previa" style={{ maxWidth: '200px', maxHeight: '200px' }} />
                    </div>
                )}
            </div>
            
            <div className="form-group">
                <label>Categoría</label>
                <input
                    type="text"
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value)}
                />
            </div>
            
            <div className="form-group">
                <label>Descripción</label>
                <textarea
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                    rows="4"
                />
            </div>
            
            <div className="form-actions">
                <button type="button" className="cancel-button" onClick={onCancel}>
                    Cancelar
                </button>
                <button type="submit" className="submit-button">
                    Guardar Producto
                </button>
            </div>
        </form>
    );
};

export default FormularioProducto;