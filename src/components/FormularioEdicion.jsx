import React, { useState, useEffect } from 'react';


function FormularioEdicion({ productoSeleccionado, onActualizar }) {
    const [producto, setProducto] = useState(productoSeleccionado);
    const [imagenPreview, setImagenPreview] = useState(productoSeleccionado.imagen || '');
    const [errorImagen, setErrorImagen] = useState('');

    useEffect(() => {
        setProducto(productoSeleccionado);
        setImagenPreview(productoSeleccionado.imagen || '');
        setErrorImagen('');
    }, [productoSeleccionado]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Si modifican la URL de imagen, limpiamos errores y actualizamos preview
        if (name === 'imagen') {
            setErrorImagen('');
            setImagenPreview(value);
        }

        setProducto((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Validar tipo: solo imágenes
            if (!file.type.startsWith('image/')) {
                setErrorImagen('El archivo debe ser una imagen.');
                return;
            }
            // Validar tamaño máximo 2MB (por ejemplo)
            const maxSize = 2 * 1024 * 1024;
            if (file.size > maxSize) {
                setErrorImagen('La imagen no puede superar los 2MB.');
                return;
            }

            setErrorImagen('');

            const reader = new FileReader();
            reader.onloadend = () => {
                setImagenPreview(reader.result);
                setProducto((prev) => ({ ...prev, imagen: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (errorImagen) {
            alert('Por favor corrige el error en la imagen antes de continuar.');
            return;
        }
        onActualizar(producto);
    };

    return (
        <form className="form-edicion" onSubmit={handleSubmit}>
            <h2 className="form-title">Editar Producto</h2>

            <div className="form-group">
                <label>ID:</label>
                <input type="number" name="id" value={producto.id || ''} readOnly />
            </div>

            <div className="form-group">
                <label>Nombre:</label>
                <input type="text" name="nombre" value={producto.nombre || ''} onChange={handleChange} required />
            </div>

            <div className="form-group">
                <label>Precio:</label>
                <input type="number" name="precio" value={producto.precio || ''} onChange={handleChange} required min="0" />
            </div>

            <div className="form-group">
                <label>Stock:</label>
                <input type="number" name="stock" value={producto.stock || ''} onChange={handleChange} required />
            </div>

            <div className="form-group">
                <label>Imagen (URL o archivo):</label>
                <input
                    type="text"
                    name="imagen"
                    value={producto.imagen || ''}
                    onChange={handleChange}
                    placeholder="Pega la URL aquí"
                />
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="file-input"
                />
                {errorImagen && <p className="error-text">{errorImagen}</p>}
                {imagenPreview && (
                    <div className="preview-container">
                        <img src={imagenPreview} alt="Vista previa" className="preview-image" />
                    </div>
                )}
            </div>

            <div className="form-group">
                <label>Categoría:</label>
                <input type="text" name="categoria" value={producto.categoria || ''} onChange={handleChange} required />
            </div>

            <button type="submit" className="submit-button">Actualizar Producto</button>
        </form>
    );
}

export default FormularioEdicion;