import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='footer px-2 scroll-mt-[-100vh]  text-[#d9d9d9] bg-[#323232] flex flex-col lg:px-5 md:px-10 py-[2vw] pt-5 sm:pt-20 mt-20  lg:gap-[30px] md:gap-[10px]' id='contact-us'>
        <div className="footer-content w-full sm:grid sm:grid-cols-4 grid-flow-col items-start lg:gap-20 md:gap-10">
            <div className='footer-content-left col-span-2 flex flex-col items-start gap-5 lg:px-4 md:px-2'>

                {/* Logo  */}
                <img src={assets.logo} alt="" className='lg:w-[150px] md:w-[130px]'/>

                {/* Footer Content  */}
                <p className='lg:text-base md:text-sm'>Welcome to Tomato.com, where culinary delight meets convenience. Indulge in a diverse menu of delicious meals crafted with care and delivered straight to your doorstep. Experience the joy of hassle-free ordering and savour every bite with Tomato.com. </p>

                {/* Social Media Icon  */}
                <div className="footer-social-icons flex lg:gap-2 lg:w-7 md:w-10 md:gap-[10px] mb-5 sm:mb-0 mx-auto sm:mx-0 gap-3">
                    <img src={assets.facebook_icon} alt="" />
                    <img src={assets.twitter_icon} alt="" />
                    <img src={assets.linkedin_icon} alt="" />
                </div>

            </div>

            <div className="outer-footer-right flex justify-between gap-10">
                {/* Footer Center  */}
            <div className='footer-content-center flex flex-col flex-1 items-start top-0 lg:gap-5 md:gap-2 mb-5 sm:mb-0 col-span-2 sm:col-span-0'>
                <h2 className='text-white font-medium mb-1 lg:text-2xl md:text-[22px]'>COMPANY</h2>
                <ul>
                    <li className='mb-2 cursor-pointer'>Home</li>
                    <li className='mb-2 cursor-pointer'>About us</li>
                    <li className='mb-2 cursor-pointer'>Delivery</li>
                    <li className='mb-2 cursor-pointer'>Privacy Policy</li>
                </ul>
            </div>

            {/* Footer Right  */}
            <div className='footer-content-right flex flex-col  items-start top-0 lg:gap-5 lg:px-4 md:px-2 md:gap-2 col-span-2 sm:col-span-0'>
                <h2 id='contact-us' className='text-white font-medium lg:text-2xl md:text-xl mb-1'>GET IN TOUCH</h2>
                <ul>
                    <li className='mb-1 cursor-pointer'><a href="tel:+917517506816">+91 9876543210</a></li>
                    <li className='mb-2 cursor-pointer'><a href="mailto:raisumit585@gmail.com">contact@tomato.com</a></li>
                </ul>
            </div>
            </div>
        </div>
        <hr className='mx-0 sm:mx-2 lg:h-0.5 md:h-0.3 bg-[#CCCCCC] border border-solid border-[#CCCCCC] relative lg:my-0 md:mt-3' />
      <p className='footer-copyright mx-auto md:pb-2'>Copyright 2024 © Tomato.com - All Rights Reserved.</p>
    </div>
  )
}

export default Footer
