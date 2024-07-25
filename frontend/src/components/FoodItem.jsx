import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { StoreContext } from "../context/StoreContext";
import { toast } from "react-toastify"; 

const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart, url, token } = useContext(StoreContext);

  return (
    <div
      className="food-item w-100 m-auto border rounded-4 transition duration-300 animate-fadeIn"
      style={{ boxShadow: "0px 0px 10px #00000015" }}
    >
      <div className="food-item-image-container relative">
        <img
          src={`${url}/images/${image}`}
          alt={`Image of ${name}`}
          className="food-item-image w-full rounded-t-2xl"
        />
        {token && cartItems[id] ? (
          <div className="food-item-counter absolute flex items-center gap-2 p-1 border-none rounded-full bg-white bottom-3 right-3 lg:bottom-2 lg:right-2 md:bottom-3 md:right-5">
            <img
              onClick={() => removeFromCart(id)}
              src={assets.remove_icon_red}
              alt="Remove item"
              className="w-10 cursor-pointer"
            />
            <p>{cartItems[id]}</p>
            <img
              onClick={() => addToCart(id)}
              src={assets.add_icon_green}
              alt="Add item"
              className="w-8 cursor-pointer"
            />
          </div>
        ) : (
          <img
            src={assets.add_icon_white}
            className="add w-8 absolute bottom-2 right-2 border-none rounded-full cursor-pointer"
            onClick={() => token ? addToCart(id) : toast.error("Please Login First")}
            alt="Add item"
          />
        )}
      </div>
      <div className="food-item-info p-5">
        <div className="food-item-name-rating flex justify-between items-center mb-3">
          <p className="text-lg font-medium">{name}</p>
          <img src={assets.rating_starts} alt="Rating stars" className="w-[80px]" />
        </div>
        <p className="food-item-description text-[#676767] text-base">
          {description}
        </p>
        <p className="food-item-price text-tomato text-lg font-medium mx-2 my-0">
          ${price}
        </p>
      </div>
    </div>
  );
};

export default FoodItem;
