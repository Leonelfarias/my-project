import React, { useState, useContext } from 'react';

import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'
import './style/styleLogin.css'

const Login = () => {

  const { setIsAuthenticated } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let validationErrors = {};
    if (!email) validationErrors.email = "Email es requerido";
    if (!password) validationErrors.password = "La contraseña es requerida";

    if (Object.keys(validationErrors).length > 0) {
      setError(validationErrors);
      return; // corta la ejecución si hay errores
    }

    try {
      const res = await fetch('/data/users.json'); // ajusta la ruta según tu estructura
      const users = await res.json();

      const foundUser = users.find(
        (user) => user.email === email && user.password === password
      );

      if (!foundUser) {
        setError({ general: 'Credenciales incorrectas' });
      } else {
        localStorage.setItem('token', 'usuario-logueado');
        setIsAuthenticated(true);
        navigate('/'); // redirigir a ruta protegida después del login
      }
    } catch (err) {
      console.error(err);
      setError({ general: 'Error al conectar con el servidor' });
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {error.email && <p style={{ color: 'red' }}>{error.email}</p>}

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error.password && <p style={{ color: 'red' }}>{error.password}</p>}

        {error.general && <p style={{ color: 'red' }}>{error.general}</p>}

        <button type="submit">Iniciar sesión</button>
      </form>
    </div>
  );
};

export default Login;