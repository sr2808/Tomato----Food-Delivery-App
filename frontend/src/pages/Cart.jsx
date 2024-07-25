import React, { useContext } from "react";
import { StoreContext } from "../context/StoreContext";
import { MdOutlineAddCircleOutline } from "react-icons/md";
import { GrSubtractCircle } from "react-icons/gr";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const { cartItems, food_list, removeFromCart, addToCart, deleteCartItem, getTotalCartAmount, url } = useContext(
    StoreContext
  );

  const navigate = useNavigate()

  return (
    <div className="cart mt-[100px] min-h-[57vh] sm:-scroll-mt-[100px] p-2">
      <div className="cart-items">
        <div
          className="cart-items-title grid grid-cols-6 items-center text-slate-500"
          style={{ fontSize: "max(1vw, 12px)" }}
        >
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <>
                <div
                  key={index}
                  className="cart-item-title cart-item-item grid grid-cols-6 justify-center items-center text-black my-2 text-sm sm:text-base"
                >
                  <img src={url + "/images/" +item.image} alt="" className="w-8 h-8 sm:w-16 sm:h-16" />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <div className="flex gap-2 items-center">
                    <GrSubtractCircle
                      width={16}
                      height={16}
                      onClick={() => removeFromCart(item._id)}
                    />
                    <p>{cartItems[item._id]}</p>
                    <MdOutlineAddCircleOutline
                      width={20}
                      height={20}
                      onClick={() => addToCart(item._id)}
                    />
                  </div>

                  <p>${item.price * cartItems[item._id]}</p>
                  <p onClick={() => deleteCartItem(item._id)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                      width={16}
                      height={16}
                      fill="currentColor"
                      onClick={() => removeFromCart(item._id)}
                      className="cursor-pointer"
                    >
                      <path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z" />
                    </svg>
                  </p>
                </div>
                <hr className="h-[1px] bg-grey border-none" />
              </>
            );
          }
        })}

        {/* Total Section  */}
        <div
          className="cart-bottom mt-[80px] flex flex-col-reverse md:flex-row justify-between scroll-mt-[100px]"
          style={{ gap: "max(12vw, 20px)" }}
        >
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
            <p>${getTotalCartAmount() > 0 ? 2: 0}</p>
          </div>
          <hr className="my-2" />
          <div className="card-total-details flex justify-between text-black font-medium">
            <p>Total</p>
            <p>${getTotalCartAmount()?getTotalCartAmount() + 2: 0 }</p>
          </div>
        </div>
        <button
          className="border-none text-white bg-tomato px-5 py-2 rounded-md cursor-pointer"
          style={{ width: "max(16vw, 250px)" }}
          onClick={() => {
            if(getTotalCartAmount()) {
              navigate("/orders");
            }
          }}
        >
          PROCEED TO CHECKOUT
        </button>
      </div>
        

        {/* Promo Code Section  */}
        <div className="cart-promocode flex-1 p-2">
          <div>
            <p className="text-[#555]">If you have a promo code, Enter it here...</p>
            <div className="promo-code-input w-full mt-2 flex justify-between items-center bg-[#eaeaea] border-red-100">
              <input type="text" placeholder="PROMOCODE" className="bg-transparent border-none outline-none p-2"/>
              <button type="submit" className="px-3 py-2 bg-black text-white" style={{width:"max(10vw, 100px)"}} >Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
