import React from 'react'
import {assets} from "../assets/assets"

const Navbar = () => {
  return (
    <div className='navbar w-full flex justify-between items-center px-4 py-[2vh]'>
     <img className="logo" style={{width:"max(10%, 130px)"}} src={assets.logo} alt="Logo" />
     <img className="profile w-16 rounded-full" src={assets.profile_image} alt="" />
    </div>
  )
}

export default Navbar
