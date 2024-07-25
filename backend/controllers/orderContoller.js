import OrderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// placing order
const placeOrder = async (req, res) => {
    const frontend_url = "http://localhost:5173";
    try {
        // Create a new order based on request body
        const newOrder = new OrderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address
        });

        // Save the new order to MongoDB
        await newOrder.save();

        // Clear user's cart data after placing order
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

        // Prepare line items for Stripe checkout session
        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: "inr",
                product_data: {
                    name: item.name
                },
                unit_amount: Math.round(item.price * 100 * 80) // Adjust as per your pricing strategy
            },
            quantity: item.quantity
        }));

        // Add delivery charges as a line item
        line_items.push({
            price_data: {
                currency: "inr",
                product_data: {
                    name: "Delivery Charges"
                },
                unit_amount: Math.round(2 * 100) // Adjust as per your pricing strategy
            },
            quantity: 1
        });

        // Create a new Stripe checkout session
        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: 'payment',
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
        });

        // Return session URL to frontend
        res.json({ success: true, session_url: session.url });
    } catch (error) {
        console.error("Error placing order:", error);
        res.status(500).json({ success: false, message: "Error placing order. Please try again." });
    }
};

// payment verification
const verifyOrder = async (req, res) => {
    const { orderId, success } = req.body;
    try {
        if (success === "true") {
            // Mark order as paid if payment was successful
            await OrderModel.findByIdAndUpdate(orderId, { payment: true });
            res.status(200).json({ success: true, message: "Payment successfully verified." });
        } else {
            // Delete order if payment was unsuccessful
            await OrderModel.findByIdAndDelete(orderId);
            res.status(400).json({ success: false, message: "Payment verification failed." });
        }
    } catch (error) {
        console.error("Error verifying order:", error);
        res.status(500).json({ success: false, message: "Error verifying order. Please try again." });
    }
};


// user order for front end

const userOrders = async(req, res) => {
    try {
        const orders = await OrderModel.find({userId: req.body.userId})
        res.status(200).json({success:true, data: orders})
    } catch (error) {
        res.json({success: false, message: "Error"})
    }
}

//Listing order for admin panel

const listOrders = async (req, res) => {
    try {
        const orders = await OrderModel.find({});
        res.status(200).json({ success: true, data: orders });
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ success: false, message: "Error in fetching orders" });
    }
};

// api for updating order status 
const updateStatus = async (req, res) => {
    try {
        const updatedOrder = await OrderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
        
        if (!updatedOrder) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }
        
        res.status(200).json({ success: true, message: "Status Updated", order: updatedOrder });
    } catch (error) {
        console.error("Error in updating status:", error);
        res.status(500).json({ success: false, message: "Error in updating status" });
    }
}


export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus };
