import { createContext, useEffect, useState } from "react";
import axios from "axios";


export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

    const [cartItems, setCartItems] = useState({})
    const url = "http://localhost:4000"
    const [token, setToken] = useState("")
    const [food_list, setFoodList] = useState([])

    const fetchFoodList = async() => {
        const response = await axios.get(`${url}/api/food/list`);
        if(response.data.success) {
            setFoodList(response.data.data);
        }
        else {
            console.log("Error in fethching foodList...");
        }
    }

    const addToCart = async(itemId) => {
        if(cartItems[itemId]) {
            setCartItems( ( prev) =>({...prev, [itemId]:prev[itemId] + 1}) )
        }
        else {
            setCartItems( ( prev) =>({...prev, [itemId]:1}) )
        }
        if(token) {
            await axios.post(url + "/api/cart/add", {itemId}, {headers: {token}})
        }
    }

    const removeFromCart = async(itemId) => {
        setCartItems( ( prev) =>({...prev, [itemId]:prev[itemId] - 1}) )
        if(token) {
            await axios.post(url + "/api/cart/remove", {itemId}, {headers: {token}})
        }
    }

    const deleteCartItem = async(itemId) => {
        const updatedCartItems = { ...cartItems };
        delete updatedCartItems[itemId];
        setCartItems(updatedCartItems);
        if(token) {
            await axios.post(url + "/api/cart/delete", {itemId}, {headers: {token}})
        }
      };
      
      const loadCartData = async(token) => {
        const response = await axios.post(url + "/api/cart/get", {}, {headers: {token}})
        setCartItems(response.data.cartData);
      } 
      

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
           if(cartItems[item] > 0) {
            let itemInfo = food_list.find((product) => (product._id === item));
            totalAmount += itemInfo.price * cartItems[item]
           }
        }
        return totalAmount;
    }

    const contextValue = {
        food_list, cartItems, setCartItems, addToCart, removeFromCart, deleteCartItem, getTotalCartAmount, url, token, setToken, setFoodList, fetchFoodList
    }

      // to set the token 
  useEffect(() => {
    const loadData = async() => {
     await fetchFoodList();
     const token = localStorage.getItem('token');
     if (token) {
       setToken(token);
       loadCartData(token)
     }
    }
    loadData();
   }, []);


    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
        
    )
}

export default StoreContextProvider;
