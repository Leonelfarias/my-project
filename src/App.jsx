import { useState, useEffect, useContext } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './layouts/Home';
import AcercaDe from './layouts/AcercaDe';
import Contactos from './layouts/Contactos';
import GaleriaDeProductos from './layouts/GaleriaDeProductos';
import DetallesProductos from './components/DetalleProducto';
import NotFound from './layouts/NotFound';
import RutasProtegidas from './auth/RutasProtegidas';
import Login from './layouts/Login';
import Admin from './layouts/Admin';
import { useAuth } from './context/AuthContext';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const { isAuth } = useAuth();

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/acercade' element={<AcercaDe />} />
        <Route path='/productos' element={<GaleriaDeProductos />} />
        <Route path='/productos/:id' element={<DetallesProductos />} />
        <Route path='/contacto' element={<Contactos />} />
        <Route path='/admin' element={
          <RutasProtegidas isAuthenticated={isAuth}>
            <Admin />
          </RutasProtegidas>
        }/>
        <Route path='/login' element={<Login />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;