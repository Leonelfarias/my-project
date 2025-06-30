import React, { useState } from 'react';
import Header from '../components/estaticos/Header'
import Footer from '../components/estaticos/Footer'
import './style/styleContactos.css';

const Contactos = ({cart, borrarProducto, vaciarCarrito}) => {
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        mensaje: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Formulario enviado:', formData);
        alert('Gracias por tu mensaje');
        setFormData({ nombre: '', email: '', mensaje: '' });
    };

  return (
    <div>
      <Header borrarProducto={borrarProducto} cartItems={cart} vaciarCarrito={vaciarCarrito}/>
   <div className="contacto-container">
            <h2 className="contacto-title">Contacto</h2>
            <form onSubmit={handleSubmit} className="contacto-form">
                <div className="form-group">
                    <label>Nombre:</label>
                    <input
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Mensaje:</label>
                    <textarea
                        name="mensaje"
                        rows="5"
                        value={formData.mensaje}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit" className="submit-button">Enviar</button>
            </form>
        </div>
      <Footer />    
     </div>
  )
}

export default Contactos