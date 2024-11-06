// DataContext.js
import React, { createContext, useState, useEffect } from 'react';

// Crear el contexto
export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  // Estado para los productos y el carrito
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  // Función para agregar un producto al carrito con la cantidad seleccionada
  const addToCart = (product) => {
    setCart((prevCart) => {
      // Verificar si el producto ya está en el carrito
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        // Si ya está, aumentar la cantidad en la cantidad especificada
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + product.quantity }
            : item
        );
      } else {
        // Si no está, agregarlo con la cantidad seleccionada
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
              return null; // Eliminar el producto si la cantidad llega a 0
            }
          }
          return item;
        })
        .filter((item) => item !== null) // Filtrar productos que se eliminaron
    );
  };

  // Ejemplo de carga inicial de productos (simulado con datos locales)
  useEffect(() => {
    const initialProducts = [
      {
        id: 1,
        name: 'Producto 1',
        price: 100,
        description: 'Descripcion breve del producto',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTISyIAyWh7Q45MGSn3hc8lDUe7tjE-UE0QpA&s',
        images: [
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTISyIAyWh7Q45MGSn3hc8lDUe7tjE-UE0QpA&s',
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTISyIAyWh7Q45MGSn3hc8lDUe7tjE-UE0QpA&s',
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTISyIAyWh7Q45MGSn3hc8lDUe7tjE-UE0QpA&s'
        ]
      },
      {
        id: 2,
        name: 'Producto 2',
        price: 200,
        description: 'Descripcion breve del producto',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmk7uDGhC65nVgNSnW9gl_R84CbWUNGwIZMA&s',
        images: [
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmk7uDGhC65nVgNSnW9gl_R84CbWUNGwIZMA&s',
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyon3QXxTplQiYUgB5ZbTTsA44shm47Vl6lYI25yC4P6268zcZhVkhfmMzcmDUq9gUp9Q&usqp=CAU',
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmk7uDGhC65nVgNSnW9gl_R84CbWUNGwIZMA&s'
        ]
      },
      // Agrega más productos según sea necesario
    ];
    
    setProducts(initialProducts);
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
