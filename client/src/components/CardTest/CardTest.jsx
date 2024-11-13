import { useState, useEffect } from 'react';
import axios from 'axios';

const CardTest = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error al obtener productos:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      {products.map(product => (
        <div key={product.id}>
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p>Precio: ${product.price}</p>
          <img src={product.image} alt={product.name} />
          {/* Muestra las imágenes adicionales */}
          <div>
            {product.images.map((img, index) => (
              <img key={index} src={img} alt={`${product.name} ${index}`} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardTest;
