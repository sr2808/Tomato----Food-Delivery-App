import userModel from "../models/userModel.js";

// add item to user cart
const addToCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = userData.cartData || {};

    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }

    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    res.status(200).json({ success: true, message: "Added To Cart" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error in Adding items to cart" });
  }
};

// remove item from user cart
const removeFromCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = userData.cartData || {};

    if (cartData[req.body.itemId] && cartData[req.body.itemId] > 0) {
      cartData[req.body.itemId] -= 1;
    } else {
      return res.status(400).json({ success: false, message: "Item not found in cart or quantity is already zero" });
    }

    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    res.status(200).json({ success: true, message: "Quantity Decreased" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error in removing items from cart" });
  }
};

// delete item from user cart
const deleteFromCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = userData.cartData || {};

    if (cartData[req.body.itemId]) {
      delete cartData[req.body.itemId];
    } else {
      return res.status(400).json({ success: false, message: "Item not found in cart" });
    }

    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    res.status(200).json({ success: true, message: "Item Removed" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error in deleting items from cart" });
  }
}

// get user cart
const getCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = await userData.cartData;
    res.status(200).json({ success: true, cartData});
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error in fetching cart" });
  }
};

export { addToCart, removeFromCart, deleteFromCart, getCart };
