const orderService = require("../services/order/order.service.js");

const createOrders = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;
    const order = await orderService.createOrder(id, quantity);
    await order.save();
    res.status(201).json({ message: "Order created", data: order });
  } catch (error) {
    res.status(400).json({ message: error.message, error: error.message });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const allOrder = await orderService.getAllOrder();
    if (!allOrder.length) {
    return res.json({ message: "No orders available yet" });
    }
    return res.status(200).json({ message: "All Orders :", data: allOrder });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};

const deleteOrders = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteOrder = orderService.deleteOrder(id);
    if (!deleteOrder) {
      return res.status(401).json({ message: "sorry something went wrong, cannot be deleted!!" });
    }
    res.status(201).json({ message: "product deleted"});
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong", error: err.message });
  }
};

module.exports = { createOrders, getAllOrders, deleteOrders };
