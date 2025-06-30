import React, { useContext } from 'react';
import './styleCart.css';
import { CartContext } from '../context/CartContext';

const Cart = ({ isOpen, onClose }) => {
  const { cart, handleDeleteFromCart, clearCart, updateQuantity, finalizarCompra } = useContext(CartContext);

  return (
    <div className={`cart-drawer ${isOpen ? 'open' : ''}`}>
      <div className='cart-header'>
        <h2>Carrito de Compras</h2>
        <button onClick={onClose} className='close-button'>X</button>
      </div>
      <div className='cart-content'>
        {cart.length === 0 ? (
          <p className="empty-cart-message">El carrito está vacío</p>
        ) : (
          <>
            <ul className='cart-items-list'>
              {cart.map((item) => (
                <li key={item.id} className="cart-item">
                  <div className="item-info">
                    <span className="item-name">{item.nombre}</span>
                    <span className="item-price">${item.precio} c/u</span>
                  </div>

                  <div className="quantity-controls">
                    <button
                      onClick={() => updateQuantity(item, item.cantidad - 1)}
                      className="quantity-btn"
                    >
                      -
                    </button>
                    <span className="item-quantity">{item.cantidad}</span>
                    <button
                      onClick={() => updateQuantity(item, item.cantidad + 1)}
                      className="quantity-btn"
                    >
                      +
                    </button>
                  </div>

                  <div className="item-subtotal">
                    ${(item.precio * item.cantidad).toFixed(2)}
                  </div>

                  <button
                    onClick={() => handleDeleteFromCart(item)}
                    className="delete-btn"
                    aria-label={`Eliminar ${item.nombre} del carrito`}
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </li>
              ))}
            </ul>

            <div className='cart-footer'>
              <p className="cart-total">
                Total: ${cart.reduce((total, item) => total + (item.precio * item.cantidad), 0).toFixed(2)}
              </p>
              <div className="cart-actions">
                <button onClick={clearCart} className="btn-clear">
                  Vaciar Carrito
                </button>
                <button onClick={finalizarCompra} className="btn-checkout">
                  Finalizar Compra
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;