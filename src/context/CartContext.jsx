import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useAuth } from '../context/AuthContext'

export const CartContext = createContext()

export const CartProvider = ({ children }) => {
    

    const [cart, setCart] = useState(()=>{
        const savedCart = localStorage.getItem("cart")
        return savedCart ? JSON.parse(savedCart) : []
    })



    const [productos, setProductos] = useState([])
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState(false)
    const { isAuth, userData } = useAuth();
    const [busqueda, setBusqueda]= useState("")

    useEffect(() => {
        fetch('https://682e2f0e746f8ca4a47c2dbd.mockapi.io/product')
            .then(respuesta => respuesta.json())
            .then(datos => {
                setTimeout(() => {
                    setProductos(datos)
                    setCargando(false)
                }, 2000)
            })
            .catch(error => {
                console.log('Error', error)
                setCargando(false)
                setError(true)
            })
    }, [])

    useEffect(()=>{
        localStorage.setItem("cart", JSON.stringify(cart))
    },[cart])

      // Función para actualizar cantidades
  const updateQuantity = (item, newQuantity) => {
    setCart(prevCart => {
      if (newQuantity <= 0) {
        return prevCart.filter(i => i.id !== item.id);
      }
      return prevCart.map(i => 
        i.id === item.id ? { ...i, cantidad: newQuantity } : i
      );
    });
  };


    const productosFiltrados = productos.filter((producto)=> producto?.nombre.toLowerCase().includes(busqueda.toLowerCase()))

    const handleAddToCart = (product) => {

        const productInCart = cart.find((item) => item.id === product.id);
        if (productInCart) {

            setCart(cart.map((item) => item.id === product.id ? { ...item, cantidad: product.cantidad } : item));
        } else {
            toast.success(`El producto ${product.nombre} se ha agregado al carrito`)
            setCart([...cart, { ...product, cantidad: product.cantidad }]);
        }
    };

    const handleDeleteFromCart = (product) => {
        toast.error(`El producto ${product.nombre} se ha eliminado al carrito`)
        setCart(prevCart => {
            return prevCart.map(item => {
                if (item.id === product.id) {
                    if (item.cantidad > 1) {
                        return { ...item, cantidad: item.cantidad - 1 };
                    } else {
                        return null; // Si quantity es 1, marcamos para eliminar
                    }
                } else {
                    return item; // Si no es el producto, lo dejamos igual
                }
            }).filter(item => item !== null); // Quitamos los productos nulos
        });
    };

    const clearCart =()=>{
        setCart([])
        localStorage.removeItem("cart")
        toast.info('Carrito vacio!')
    }


    const finalizarCompra = () => {
        if (!isAuth) {
            toast.warning("Debes iniciar sesión para finalizar la compra");
            return;
        }

        if (cart.length === 0) {
            toast.warning("Tu compra se ha realizado");
            return;
        }

        const totalGastado = cart.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

        toast.success(`¡Gracias por tu compra, ${userData?.email || userData?.nombre || 'Usuario'}! Total gastado: $${totalGastado.toFixed(2)}`);

        setCart([]);
        localStorage.removeItem("cart");
    };
     return (
        <CartContext.Provider 
            value={{
                cart,
                productos,
                cargando,
                error,
                handleAddToCart,
                handleDeleteFromCart,
                productosFiltrados,
                busqueda,
                setBusqueda,
                clearCart,
                updateQuantity,
                finalizarCompra
            }}
        >
            {children}
        </CartContext.Provider>
    )
}