import React, { useContext } from 'react';
import { DataContext } from '../DataContext/DataContext';
import { motion } from 'framer-motion';
import arrow from '../../../public/arrow-left-334-svgrepo-com.svg'
const Cart = ({ onClose }) => {
    const { cart, incrementQuantity, decrementQuantity } = useContext(DataContext);

    const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    // Definir las animaciones de entrada y salida
    const cartVariants = {
        hidden: { scale: 0.8, opacity: 0 },
        visible: { scale: 1, opacity: 1 },
        exit: { scale: 0.8, opacity: 0 }
    };

    const generateWhatsAppLink = (cart, total) => {
        const baseUrl = 'https://api.whatsapp.com/send?phone=54358 436-0695';
        let message = 'Hola!, Quiero realizar la compra de los siguientes productos!:\n';
    
        cart.forEach((product) => {
          message += `- ${product.id} ${product.name}, Precio por unidad: $${product.price.toLocaleString()}, Cantidad: ${product.quantity}\n`;
        });
    
        message += `\nTotal de la compra: $${total.toLocaleString()}`;
    
        const encodedMessage = encodeURIComponent(message);
        return `${baseUrl}&text=${encodedMessage}`;
      };
    
      const handleWhatsAppShare = () => {
        const link = generateWhatsAppLink(cart, totalPrice);
        window.open(link, '_blank');
      };
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <motion.div
                className="bg-white w-full h-full rounded-lg shadow-lg"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={cartVariants}
                transition={{ duration: 0.3 }} // Duración de la animación
            >
                <button 
                    onClick={onClose} 
                    className="text-black mt-2 mx-1 rounded hover:bg-red-600">
                  <div className='flex'>
                 <img className='w-3 mt-.5' src={arrow} alt="" />
                    <span className='mx-1'> Regresar </span>
                    </div>
                </button>
                <div className='p-6'>
                    <h2 className="text-xl font-bold mb-4 text-center">Tus Productos</h2>
                    {cart.length === 0 ? (
                        <p className='text-center my-2'>No hay productos en el carrito.</p>
                    ) : (
                        cart.map(item => (
                            <div key={item.id} className="flex justify-between mb-2">
                                <span>{item.name}</span>
                                <div className="flex items-center">
                                    <button 
                                        onClick={() => decrementQuantity(item.id)} 
                                        className="bg-custom-brown text-white px-2 rounded-xl">
                                        -
                                    </button>
                                    <span className="px-3">{item.quantity}</span>
                                    <button 
                                        onClick={() => incrementQuantity(item.id)} 
                                        className="bg-custom-brown text-white px-2 rounded-xl">
                                        +
                                    </button>
                                    <span className="ml-2">${(item.price * item.quantity).toFixed(2)}</span>
                                </div>
                            </div>
                        ))
                    )}
                    <div className="flex justify-between font-bold">
                        <span>Total:</span>
                        <span>${totalPrice.toFixed(2)}</span>
                    </div>
                    <button
                type="button"
                onClick={handleWhatsAppShare}
                className="montserrat2 bg-green-500 text-white p-2 rounded-xl mt-2"
              >
               Realizar mi Compra por WhatsApp
              </button>
                </div>
            </motion.div>
        </div>
    );
};

export default Cart;
