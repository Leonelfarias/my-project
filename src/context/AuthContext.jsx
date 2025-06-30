import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isAuth, setIsAuth] = useState(false);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedAuth = localStorage.getItem('isAuth');
    const savedUser = JSON.parse(localStorage.getItem('userData'));
    if (savedAuth === 'true' && savedUser) {
      setIsAuth(true);
      setUserData(savedUser);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      setErrors({
        email: !email ? 'Email es requerido' : '',
        password: !password ? 'Password es requerido' : ''
      });
      return;
    }

    try {
      const res = await fetch('data/users.json');
      const users = await res.json();

      const foundUser = users.find(
        user => user.email === email && user.password === password
      );

      if (!foundUser) {
        setErrors({ email: 'Credenciales inválidas' });
      } else {
        const userInfo = {
          email: foundUser.email,
          role: foundUser.role
        };
        
        setIsAuth(true);
        setUserData(userInfo);
        localStorage.setItem('isAuth', 'true');
        localStorage.setItem('userData', JSON.stringify(userInfo));

        if (foundUser.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/');
        }
      }
    } catch (err) {
      console.error('Error:', err);
      setErrors({ general: 'Error al iniciar sesión' });
    }
  };

  const logout = () => {
    setIsAuth(false);
    setEmail('');
    setPassword('');
    setUserData(null);
    localStorage.removeItem('isAuth');
    localStorage.removeItem('userData');
    navigate('/');
  };

  return (
    <AuthContext.Provider 
      value={{ 
        isAuth,
        email,
        setEmail,
        password,
        setPassword,
        userData, // Contiene {email, role}
        errors,
        handleSubmit,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);