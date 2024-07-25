import React from 'react';
import { assets } from '../assets/assets';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className="sidebar-options border border-r-2 border-slate-400 h-screen w-[80px] md:w-[250px] ">
        <NavLink
          to="/add"
          className={({ isActive }) =>
            `cursor-pointer w-[50px] md:w-[200px] ml-auto sidebar-option flex justify-center items-center gap-4 my-4 border border-slate-400 border-r-0 px-2 md:px-5 py-2 rounded-l-xl ${
              isActive ? 'bg-tomato text-white' : ''
            }`
          }
        >
          <img src={assets.add_icon} alt="add icon" />
          <p className='hidden md:block'>Add Items</p>
        </NavLink>
        <NavLink
          to="/list"
          className={({ isActive }) =>
            `cursor-pointer w-[50px] md:w-[200px] ml-auto sidebar-option flex justify-center items-center gap-4 my-4 border border-slate-400 border-r-0 px-2 md:px-5 py-2 rounded-l-xl ${
              isActive ? 'bg-tomato text-white' : ''
            }`
          }
        >
          <img src={assets.order_icon} alt="add icon" />
          <p className='hidden md:block'>List Items</p>
        </NavLink>
        <NavLink
          to="/orders"
          className={({ isActive }) =>
            `cursor-pointer w-[50px] md:w-[200px] ml-auto sidebar-option flex justify-center items-center gap-4 my-4 border border-slate-400 border-r-0 px-2 md:px-5 py-2 rounded-l-xl ${
              isActive ? 'bg-tomato text-white' : ''
            }`
          }
        >
          <img src={assets.order_icon} alt="add icon" />
          <p className='hidden md:block'>Orders</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
