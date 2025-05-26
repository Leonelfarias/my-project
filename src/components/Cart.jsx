import React from 'react'
import './styleCart.css'

const Cart = ({ cartItems, isOpen, onClose, borrarProducto, vaciarCarrito }) => {

    return (
        <div className={`cart ${isOpen ? 'open' : ''}`}> {/* open si esta abierto el carrito */}
            <div className='cart-header'><h2>Carrito de compras</h2>
                <button onClick={onClose}>X</button>
            </div>

            <div>
                {cartItems.length === 0 ? (
                    <p style={{ color: 'red' }}>El carrito está vacío</p>
                ) : (
                    <>
                        <table className="cart-table">
                            <thead>
                                <tr>
                                    <th>Producto</th>
                                    <th>Cantidad</th>
                                    <th>Precio unitario</th>
                                    <th>Precio total</th>
                                    <th>Eliminar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartItems.map((item) => (
                                    <tr key={item.id}>
                                        <td>{item.nombre}</td>
                                        <td className="center">{item.cantidad}</td>
                                        <td className="center">${item.precio.toFixed(2)}</td>
                                        <td className="center">${(item.precio * item.cantidad).toFixed(2)}</td>
                                        <td className="center">
                                            <button className="delete-button" onClick={() => borrarProducto(item)}>
                                                <i className="fa-solid fa-trash"></i> 
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {cartItems.length > 0 && (
                            <div className="cart-total">
                                Total final: $
                                {cartItems.reduce((total, item) => total + item.precio * item.cantidad, 0).toFixed(2)}
                            </div>
                        )}

                            <div className="cart-actions">
                                <button className="clear-cart-button" onClick={vaciarCarrito}>
                                    Vaciar carrito 🗑️
                                </button>
                            </div>

                    </>

                )}
            </div>

        </div>
    )
}

export default Cart