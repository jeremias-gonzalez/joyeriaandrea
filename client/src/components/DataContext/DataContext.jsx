// DataContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios'; // Asegúrate de que axios esté instalado con `npm install axios`

// Crear el contexto
export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + product.quantity }
            : item
        );
      } else {
        return [...prevCart, { ...product }];
      }
    });
  };

  const incrementQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrementQuantity = (id) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.id === id) {
            if (item.quantity > 1) {
              return { ...item, quantity: item.quantity - 1 };
            } else {
              return null;
            }
          }
          return item;
        })
        .filter((item) => item !== null)
    );
  };

  // Obtener productos desde el backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const apiUrl = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;
        const response = await axios.get(`${apiUrl}/api/products`, { withCredentials: true });
     
        console.log('Datos recibidos del bckend:', response.data); // Verifica aquí
  
        const formattedProducts = response.data.map((row, index) => ({
          // id: index + 1,
          name: row[0],
          price: row[5],
          //description: row[2],
          image: `${apiUrl}/images/${row[6]}`,
        }));
  
        setProducts(formattedProducts);
      } catch (error) {
        console.error('Error al obtener productos:', error);
      }
    };
  
    fetchProducts();
  }, []);
  

  return (
    <DataContext.Provider
      value={{
        products,
        cart,
        addToCart,
        incrementQuantity,
        decrementQuantity,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
