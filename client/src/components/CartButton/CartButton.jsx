
import { motion } from 'framer-motion';
import carticon from '../../../public/cart-shopping-svgrepo-com.svg';
const CartButton = ({ totalItems, totalPrice, onClick }) => {
    return (
        <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="fixed bottom-4  p-4 bg-custom-brown text-white rounded-2xl shadow-xl"
        >
          <button className='w-80 flex items-center justify-between p-2 ' onClick={onClick}>
    <div className='flex items-center gap-4'>
        <span className='border border-gray-300 rounded-full w-8 h-8 flex items-center justify-center'>
            {totalItems}
        </span>
        <div className='flex items-center'>
            <img className='w-5 h-5' src={carticon} alt="Ícono del carrito" />
            <span className='ml-2'>Ver carrito</span>
        </div>
    </div>
    <span className='font-semibold'>ARS ${totalPrice.toFixed(2)}</span>
</button>

        </motion.div>
    );
};
export default CartButton;