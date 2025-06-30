import { createContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
    const apiUrl = 'https://682e2f0e746f8ca4a47c2dbd.mockapi.io/product';

    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [seleccionado, setSeleccionado] = useState(null);
    const [openEditor, setOpenEditor] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                setTimeout(() => {
                    setProductos(data);
                    setLoading(false);
                }, 2000);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                setError(true);
                setLoading(false);
                toast.error("Error al cargar productos");
            });
    }, []);

    const cargarProductos = async () => {
        try {
            const res = await fetch(apiUrl);
            const data = await res.json();
            setProductos(data);
        } catch (error) {
            console.log('Error al cargar productos ', error);
            toast.error('Error al cargar productos');
        }
    };

    const agregarProducto = async (producto) => {
        try {
            const respuesta = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(producto)
            });

            if (!respuesta.ok) {
                if (respuesta.status === 413) {
                    throw new Error("El producto es demasiado grande. Reducí la imagen o información.");
                }
                throw new Error('Error al agregar producto');
            }

            const data = await respuesta.json();
            setProductos((prev) => [data, ...prev]);
            toast.success('Producto agregado correctamente');
            setOpen(false);
            setOpenEditor(false);
        } catch (error) {
            console.error(error.message);
            toast.error(error.message || 'No se pudo agregar el producto');
        }
    };

    const actulizarProducto = async (producto) => {
        try {
            const respuesta = await fetch(`${apiUrl}/${producto.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(producto)
            });

            if (!respuesta.ok) throw new Error('Error al actualizar el producto');

            const data = await respuesta.json();
            toast.success('Producto actualizado correctamente');
            setOpenEditor(false);
            setSeleccionado(null);
            cargarProductos();
        } catch (error) {
            console.error(error.message);
            toast.error('No se pudo actualizar el producto');
        }
    };

    const eliminarProducto = async (id) => {
        const confirmar = window.confirm('¿Estás seguro de eliminar el producto?');
        if (confirmar) {
            try {
                const respuesta = await fetch(`${apiUrl}/${id}`, {
                    method: 'DELETE',
                });

                if (!respuesta.ok) throw new Error('Error al eliminar');

                toast.success('Producto eliminado correctamente');
                cargarProductos();
            } catch (error) {
                console.error(error.message);
                toast.error('Hubo un problema al eliminar el producto');
            }
        }
    };

    return (
        <AdminContext.Provider value={{
            productos,
            loading,
            open,
            setOpen,
            seleccionado,
            setSeleccionado,
            openEditor,
            setOpenEditor,
            agregarProducto,
            actulizarProducto,
            eliminarProducto,
        }}>
            {children}
        </AdminContext.Provider>
    );
};