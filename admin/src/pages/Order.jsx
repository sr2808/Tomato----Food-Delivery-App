import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';

const Order = () => {
  const URL = 'http://localhost:4000'; // Base URL
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(`${URL}/api/order/list`);
      if (response.data.success) {
        setOrders(response.data.data); // Assuming response.data.orders contains the orders array
        console.log(response.data.data);
      } else {
        toast.error('Error fetching orders');
      }
    } catch (error) {
      toast.error('Error fetching orders');
      console.error('There was an error fetching the orders:', error);
    }
  };

  const statusHandler = async(event, orderId) => {
    const response = await axios.post(URL + "/api/order/status", {orderId, status:event.target.value})
    if(response.data.success) {
      await fetchAllOrders();
    }
  }

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className='order add flex flex-col px-6'>
      <h3 className='text-2xl text-outfit font-medium mx-2 my-4'>Order Page</h3>
      <div className='order-list'>
        {orders.map((order, index) => (
          <div 
          className="order-item flex flex-col lg:grid px-4 py-2 lg:grid-cols-5 items-start mx-2 border-2 my-4 p-4 border-tomato text-[12px]  lg:text-[14px] text-[#505050]" 
          key={index}
        >
            <img src={assets.parcel_icon} alt="Parcel Icon" className='w-10 lg:w-16'/>
            <div>
              <p className="order-item-food font-medium mb-[5px]">
                {order.items.map((item, idx) => (
                  <span key={idx}>
                    {item.name} x {item.quantity}
                    {idx !== order.items.length - 1 ? ', ' : ''}
                  </span>
                ))}
              </p>
              <p className="order-item-name font-medium lg:mt-[30px] mb-[5px]">
                {
                  order.address.firstName + " " + order.address.lastName
                }
              </p>
              <div className="order-item-address lg:mb-[10px] mb-[5px]">
                <p>{order.address.street+ ", "}</p>
                <p>{order.address.city+", "+ order.address.state + ", "+ order.address.country+ " - "+ order.address.zipcode}</p>
              </div>
              <p className="order-item-phone">{order.address.phone}</p>
            </div>
            <p className='mb-[5px]'>Items: {order.items.length}</p>
            <p className='mb-[10px]'>${order.amount}</p>
            <select onChange={(event) => statusHandler(event, order._id)} value={order.status} className='bg-[#ffe8e4] border border-1 border-tomato w-[max(10vw, 120px)] font-medium p-[5px] outline-none  text-3'>
              <option value="Food Processing">Food Processing</option>
              <option value="Out for Delivery">Out for Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Order;
