import React, { useContext, useState, useRef } from 'react';
import { DataContext } from '../DataContext/DataContext';
import { motion } from 'framer-motion';
import CartButton from '../CartButton/CartButton';
import Cart from '../Cart/Cart';

const Card = ({ product }) => {
    const { addToCart, cart } = useContext(DataContext);
    const [showCartButton, setShowCartButton] = useState(false);
    const [showCart, setShowCart] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const sliderRef = useRef(null);
    const [startX, setStartX] = useState(null);

    const handleAddToCart = () => {
        addToCart({ ...product, quantity });
        if (cart.length === 0) {
            setShowCartButton(true);
        }
        setShowModal(false); // Cierra el modal después de agregar
    };

    const totalItems = cart ? cart.reduce((acc, item) => acc + item.quantity, 0) : 0;
    const totalPrice = cart ? cart.reduce((acc, item) => acc + item.price * item.quantity, 0) : 0;
    const openCart = () => setShowCart(true);
    const closeCart = () => setShowCart(false);

    // Funciones para manejar el slider
    const nextImage = () => setCurrentImageIndex((currentImageIndex + 1) % product.images.length);
    const prevImage = () => setCurrentImageIndex((currentImageIndex - 1 + product.images.length) % product.images.length);

    // Funciones para deslizar
    const handleMouseDown = (e) => {
        setStartX(e.clientX);
    };

    const handleMouseMove = (e) => {
        if (startX === null) return;

        const distance = e.clientX - startX;
        if (distance > 100) {
            prevImage();
            setStartX(null);
        } else if (distance < -100) {
            nextImage();
            setStartX(null);
        }
    };

    const handleMouseUp = () => {
        setStartX(null);
    };

    const handleTouchStart = (e) => {
        setStartX(e.touches[0].clientX);
    };

    const handleTouchMove = (e) => {
        if (startX === null) return;

        const distance = e.touches[0].clientX - startX;
        if (distance > 100) {
            prevImage();
            setStartX(null);
        } else if (distance < -100) {
            nextImage();
            setStartX(null);
        }
    };

    return (
        <div className="p-4">
            <img
                src={product.image}
               
                className="w-96 h-96 mb-4 rounded-md"
                onClick={() => setShowModal(true)} // Abre el modal al hacer clic en la imagen
            />
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-gray-700">{product.price}</p>
            <button
                onClick={() => setShowModal(true)} // Abre el modal al hacer clic en el botón
                className="mt-2  text-custom-brown underline py-2  rounded-xl hover:bg-blue-600 transition-colors duration-300"
            >
                Ver detalles
            </button>
            {showCartButton && totalItems > 0 && (
                <CartButton
                    totalItems={totalItems}
                    totalPrice={totalPrice}
                    onClick={openCart}
                />
            )}
            {showCart && <Cart onClose={closeCart} />}

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <motion.div
                        className="bg-white w-full h-full max-w-md p-4 rounded-lg shadow-lg"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                    >
                        <button onClick={() => setShowModal(false)} className="text-red-500 text-xl mb-10">
                            X
                        </button>
                        <div
                            ref={sliderRef}
                            className="flex justify-center relative"
                            onMouseDown={handleMouseDown}
                            onMouseMove={handleMouseMove}
                            onMouseUp={handleMouseUp}
                            onTouchStart={handleTouchStart}
                            onTouchMove={handleTouchMove}
                        >
                            {/* Slider de imágenes */}
                            <button
                                onClick={prevImage}
                                className="text-white bg-custom-brown rounded-full w-10 h-10 flex items-center justify-center my-48 mx-[-1rem] absolute left-4 z-10"
                            >
                                {"<"}
                            </button>
                            <img
                                src={product.images[currentImageIndex]}
                                alt={product.name}
                                className="w-full h-full object-cover rounded-xl px-2 mb-10"
                            />
                            <button
                                onClick={nextImage}
                                className="text-white bg-custom-brown rounded-full w-10 h-10 flex items-center justify-center my-48 mx-[-1rem] absolute  right-4 z-10"
                            >
                                {">"}
                            </button>
                        </div>

                        {/* Círculos indicadores */}
                        <div className="flex justify-center mt-2">
                            {product.images.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentImageIndex(index)}
                                    className={`${
                                        currentImageIndex === index ? "bg-custom-brown" : "bg-gray-300"
                                    } w-3 h-3 mx-2 rounded-full`}
                                />
                            ))}
                        </div>

                        <h3 className="text-lg font-semibold mt-4">{product.name}</h3>
                        <p className="text-gray-700">{product.price}</p>

                        {/* Incremento/Decremento de cantidad */}
                        <div className="flex items-center mt-4 my-4">
                            <p className=''>Cantidad:  </p>
                            <div className='mx-2'>
                            <button
                                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                                className="px-2 py-1 bg-custom-brown text-white rounded-2xl"
                            >
                                -
                            </button>
                            <span className="px-4 py-1 bg-white">{quantity}</span>
                            <button
                                onClick={() => setQuantity((prev) => prev + 1)}
                                className="px-2 py-1 bg-custom-brown text-white rounded-2xl"
                            >
                                +
                            </button>
                            </div>
                        </div>
                        <p>{product.description}</p>
                        <button
                            onClick={handleAddToCart}
                            className="mt-4 bg-custom-brown text-white py-2 px-4 rounded-xl hover:bg-custom-brown transition-colors duration-300 w-full"
                        >
                            Agregar al Carrito
                        </button>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default Card;
