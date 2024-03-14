// controllers/billController.js
const Bill = require('../models/bill');
const Customer = require('../models/customer');
const Product = require('../models/product');

// Create a new bill
exports.createBill = async (req, res) => {
  try {
    const { customer, products } = req.body;
    
    // Check if customer exists
    const existingCustomer = await Customer.findById(customer);
    if (!existingCustomer) {
      return res.status(404).json({ error: "Customer not found" });
    }

    // Calculate total amount based on product prices
    let totalAmount = 0;
    for (const productId of products) {
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ error: `Product with ID ${productId} not found` });
      }
      totalAmount += product.price;
    }

    const newBill = new Bill({
      customer,
      products,
      totalAmount
    });

    const savedBill = await newBill.save();
    res.status(201).json(savedBill);
  } catch (error) {
    console.error("Error creating bill:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get all bills
exports.getAllBills = async (req, res) => {
  try {
    const bills = await Bill.find().populate('customer').populate('products');
    res.status(200).json(bills);
  } catch (error) {
    console.error("Error fetching bills:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get a bill by ID
exports.getBillById = async (req, res) => {
  try {
    const { id } = req.params;
    const bill = await Bill.findById(id).populate('customer').populate('products');
    if (!bill) {
      return res.status(404).json({ error: "Bill not found" });
    }
    res.status(200).json(bill);
  } catch (error) {
    console.error("Error fetching bill by ID:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update a bill by ID
exports.updateBillById = async (req, res) => {
  try {
    const { id } = req.params;
    const { customer, products } = req.body;

    // Check if bill exists
    const existingBill = await Bill.findById(id);
    if (!existingBill) {
      return res.status(404).json({ error: "Bill not found" });
    }

    // Check if customer exists
    const existingCustomer = await Customer.findById(customer);
    if (!existingCustomer) {
      return res.status(404).json({ error: "Customer not found" });
    }

    // Calculate total amount based on product prices
    let totalAmount = 0;
    for (const productId of products) {
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ error: `Product with ID ${productId} not found` });
      }
      totalAmount += product.price;
    }

    // Update bill
    existingBill.customer = customer;
    existingBill.products = products;
    existingBill.totalAmount = totalAmount;

    const updatedBill = await existingBill.save();
    res.status(200).json(updatedBill);
  } catch (error) {
    console.error("Error updating bill by ID:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete a bill by ID
exports.deleteBillById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBill = await Bill.findByIdAndDelete(id);
    if (!deletedBill) {
      return res.status(404).json({ error: "Bill not found" });
    }
    res.status(200).json({ message: "Bill deleted successfully" });
  } catch (error) {
    console.error("Error deleting bill by ID:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
