import React, { useState, useContext } from 'react';

import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'
import './style/styleLogin.css'
import Header from '../components/estaticos/Header';
import Footer from '../components/estaticos/Footer';

const Login = () => {

  
  const {email, setEmail,password, setPassword, handleSubmit,errors} = useAuth()
  


  return (
    <>
    <Header/>
    <section>
  <div className="login-container">
       
    <h2 className="login-title">Iniciar Sesión</h2>
    <form className="login-form" onSubmit={handleSubmit}>

      <label>Email</label>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {errors.email && <div className="login-error">{errors.email}</div>}

      <label>Contraseña</label>
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {errors.password && <div className="login-error">{errors.password}</div>}

      {errors.general && <div className="login-error">{errors.general}</div>}

      <button type="submit" className="login-button">Iniciar sesión</button>
    </form>
        
  </div>
  </section>
  <Footer />
  </>
);
};

export default Login;