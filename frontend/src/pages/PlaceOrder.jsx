import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";

export default function PlaceOrder() {
  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);
  const navigate = useNavigate();

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();
    const orderItems = [];
    food_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = { ...item, quantity: cartItems[item._id] };
        orderItems.push(itemInfo);
      }
    });

    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2,
    };

    try {
      let response = await axios.post(`${url}/api/order/place`, orderData, {
        headers: { token },
      });

      if (response.data.success) {
        const { session_url } = response.data;
        window.location.replace(session_url);
      } else {
        toast.error("Error placing order");
      }
    } catch (error) {
      console.error("Error placing order", error);
      toast.error("An error occurred while placing your order. Please try again.");
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/cart");
    } else if (getTotalCartAmount() === 0) {
      navigate("/cart");
    }
  }, [token, getTotalCartAmount, navigate]);

  return (
    <div className="place-order mt-16  h-[70vh] p-2 flex justify-center items-center flex-wrap gap-[10vw] sm:mt-0">
      <div className="delivery-info flex flex-col justify-start items-start sm:mt-[100px]">
        <div>
          <h2 className="text-xl font-medium my-2">Delivery Details</h2>
        </div>
        <form onSubmit={placeOrder}>
          <div className="multifeild flex flex-wrap justify-between items-center">
            <input
              required
              type="text"
              placeholder="First Name"
              className="px-3 py-1 mx-1 my-2 w-[45vw] sm:w-[300px] sm:mr-3 border border-gray-600 rounded-md"
              name="firstName"
              onChange={onChangeHandler}
              value={data.firstName}
            />
            <input
              required
              type="text"
              placeholder="Last Name"
              className="px-3 py-1 mx-1 my-2 w-[45vw] sm:w-[300px] sm:mr-3 border border-gray-600 rounded-md"
              name="lastName"
              onChange={onChangeHandler}
              value={data.lastName}
            />
          </div>
          <input
            required
            type="email"
            placeholder="Email Address"
            className="px-3 py-1 mx-1 my-2 w-[96vw] sm:w-[400px] sm:mx-1 border border-gray-600 rounded-md"
            name="email"
            onChange={onChangeHandler}
            value={data.email}
          />
          <br />
          <input
            required
            type="text"
            placeholder="Street"
            className="px-3 py-1 mx-1 my-2 w-[96vw] sm:w-[400px] sm:mx-1 border border-gray-600 rounded-md"
            name="street"
            onChange={onChangeHandler}
            value={data.street}
          />
          <div className="multifeild flex flex-wrap justify-between items-center">
            <input
              required
              type="text"
              placeholder="City"
              className="px-3 py-1 mx-1 my-2 w-[45vw] sm:w-[300px] sm:mr-3 border border-gray-600 rounded-md"
              name="city"
              onChange={onChangeHandler}
              value={data.city}
            />
            <input
              required
              type="text"
              placeholder="State"
              className="px-3 py-1 mx-1 my-2 w-[45vw] sm:w-[300px] sm:mr-3 border border-gray-600 rounded-md"
              name="state"
              onChange={onChangeHandler}
              value={data.state}
            />
          </div>
          <div className="multifeild flex flex-wrap justify-between items-center">
            <input
              required
              type="number"
              placeholder="Zip Code"
              className="px-3 py-1 mx-1 my-2 w-[45vw] sm:w-[300px] sm:mr-3 border border-gray-600 rounded-md"
              name="zipcode"
              onChange={onChangeHandler}
              value={data.zipcode}
            />
            <input
              required
              type="text"
              placeholder="Country"
              className="px-3 py-1 mx-1 my-2 w-[45vw] sm:w-[300px] sm:mr-3 border border-gray-600 rounded-md"
              name="country"
              onChange={onChangeHandler}
              value={data.country}
            />
          </div>
          <input
            required
            type="tel"
            placeholder="Contact Number"
            className="px-3 py-1 mx-1 my-2 w-[96vw] sm:w-[400px] sm:mx-1 border border-gray-600 rounded-md"
            name="phone"
            onChange={onChangeHandler}
            value={data.phone}
          />
          <br />
          <button
            className="border-none text-white bg-tomato px-5 py-2 rounded-md cursor-pointer mt-4"
            style={{ width: "max(16vw, 250px)" }}
            type="submit"
          >
            PROCEED TO PAYMENT
          </button>
        </form>
      </div>
      <div className="cart-total flex flex-col flex-1 gap-5 p-2">
        <h2 className="font-medium text-xl">Cart Total</h2>
        <div>
          <div className="card-total-details flex justify-between text-[#555]">
            <p>Subtotal</p>
            <p>${getTotalCartAmount()}</p>
          </div>
          <hr className="my-2" />
          <div className="card-total-details flex justify-between text-[#555]">
            <p>Tax</p>
            <p>${getTotalCartAmount() > 0 ? 2 : 0}</p>
          </div>
          <hr className="my-2" />
          <div className="card-total-details flex justify-between text-black font-medium">
            <p>Total</p>
            <p>${getTotalCartAmount() ? getTotalCartAmount() + 2 : 0}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
