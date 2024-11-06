import React from 'react'
import Cart from '../Cart/Cart'
import logo from '../../../public/andrejoyeria.png'
import instagram from '../../../public/instagram-svgrepo-com.svg'
import whatsapp from '../../../public/whatsapp-svgrepo-com.svg'
const Navbar = () => {
  return (
    <div className='flex flex-col shadow-md'>
        {/* <Cart/> */}
        <div className='mx-auto my-10'>
            <img src={logo} className='text-center w-48'/>
          
            <div className='flex mt-10 ml-10 '>
            <div className='mx-1'>
              <a href="https://www.instagram.com/joyeriaandrea2024/" target='_blank'>
               <img className='w-10' src={instagram} alt="" />
              </a>
            </div>
            <div className=' mx-3'>
              <a href="https://api.whatsapp.com/send?phone=543584360695&text=%F0%9F%91%8BHola!Mi%20nombre%20es%3A%20%20%2C%20y%20quiero%20mas%20info%20de%20los%20productos!%F0%9F%92%8E" target='_blank'> 
              <img className='w-11 mt-[-.2rem]' src={whatsapp} alt="" />
              </a>
            </div>
            </div>
        

        </div>
    </div>
  )
}

export default Navbar