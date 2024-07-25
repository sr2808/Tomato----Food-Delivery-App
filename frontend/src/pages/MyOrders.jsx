import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../context/StoreContext";
import axios from "axios";
import { assets } from "../assets/assets";

const MyOrders = () => {
  const [data, setData] = useState([]);
  const { url, token } = useContext(StoreContext);

  const fetchOrders = async () => {
    const response = await axios.post(
      url + "/api/order/userorder",
      {},
      { headers: { token } }
    );
    setData(response.data.data);
    // console.log(response.data.data);
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <div className="myorders mt-[100px] h-full mx-[50px]">
      <h2 className="text-xl font-medium my-2">My Orders</h2>
      <div className="container flex flex-col gap-5 mt-[30px]">
        {data.map((order, index) => {
          return (
            <div
              className="my-orders-order grid lg:grid-cols-6 grid grid-cols-3 gap-y-[5px] text-3 sm:grid-cols-6  gird-template- items-center gap-[30px] text-[14px] text-[#454545] border-[1px] border-tomato px-2 py-3"
              key={index}
            >
              <img src={assets.parcel_icon} alt="" className="w-[50px]"/>
              <p>
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + " x " + item.quantity;
                  } else {
                    return item.name + " x " + item.quantity + ", ";
                  }
                })}
              </p>
              <p>${order.amount + ".00"}</p>
              <p>Items: {order.items.length}</p>
              <p className="inline-flex text-[12px] lg:text-base">
                <span className="text-tomato">&#x25cf; </span>
                <b className="font-medium text-[#454545]">{order.status}</b>
              </p>
              <button className="text-[10px] lg:text-base border-none rounded-md px-1 text-[#454545] cursor-pointer py-1 bg-tomato text-white" onClick={() =>fetchOrders()}>Track Order</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyOrders;
