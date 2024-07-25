import React from 'react'
import { menu_list } from '../assets/assets'

const ExploreMenu = ({category, setCategory}) => {
  return (
    <div className='explore-menu mt-20 sm:mt-[0px] scroll-mt-[100px] sm:ml-0 lg:mt-[150px] md:mt-[100px] lg:scroll-mt-[100px] md:scroll-mt-20 ' id='explore-menu'>
      <h1 className='text-2xl mb-2 font-medium text-[#262626]' style={{fontSize: "max(2vw, 24px)"}}>Explore our menu</h1>
      <p className='explore-menu-text text-base mb-5 text-[#808080] lg:max-w-[65%] md:max-w-[90%]'>Choose from a diverse menu featuring array of dishes. Our mission is to satisfy your cravings and elevate your dining experience. One delicious meal at a time.</p>
        <div className="explore-menu-list flex gap-[30px] justify-between overflow-x-hidden">
            {
                menu_list.map( (item, index) => {
                    return (
                        <div key={index} className='explore-menu-list-item items-center text-center m-auto cursor-pointer' onClick={() => setCategory(prev => prev===item.menu_name? "All": item.menu_name)}>
                            <img src={item.menu_image} alt={item.menu_name} className={category===item.menu_name?"mb-2 min-w-16 max-w-21 border-4 border-solid border-tomato p-1 rounded-full transition duration-200 ":"mb-2 min-w-16 max-w-21 rounded-full transition duration-200"}/>
                            <p className='font-medium text-[#747474]' style={{fontSize: "max(1.2vw, 16px)"}}>{item.menu_name}</p>
                        </div>
                    )
                })
            }
        </div>
        <hr className='mx-2 bg-[#e2e2e2] h-0.5 border border-none my-6 relative' />
    </div>
  )
}

export default ExploreMenu;

