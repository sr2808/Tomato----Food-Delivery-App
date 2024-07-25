import express from "express";
import authMiddleware from "../middleware/auth.js"
import { listOrders, placeOrder, updateStatus, userOrders, verifyOrder } from "../controllers/orderContoller.js"

const orderRouter = express.Router();

orderRouter.post("/place", authMiddleware, placeOrder)
orderRouter.post("/verify", verifyOrder) // removed auth middle ware because it was causinf problems...
orderRouter.post("/userorder", authMiddleware, userOrders);
orderRouter.get("/list", listOrders)
orderRouter.post("/status", updateStatus)


export default orderRouter;