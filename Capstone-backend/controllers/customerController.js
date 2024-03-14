// controllers/customerController.js
const Customer = require('../models/customer');
const Bill = require('../models/bill');

// Create a new customer
exports.createCustomer = async (req, res) => {
  try {
    const { name, email, phoneNumber, address } = req.body;

    // Check if customer with the same email already exists
    const existingCustomer = await Customer.findOne({ email });
    if (existingCustomer) {
      return res.status(400).json({ error: "Customer with this email already exists" });
    }

    const newCustomer = new Customer({
      name,
      email,
      phoneNumber,
      address
    });

    const savedCustomer = await newCustomer.save();
    res.status(201).json(savedCustomer);
  } catch (error) {
    console.error("Error creating customer:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get all customers
exports.getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    res.status(200).json(customers);
  } catch (error) {
    console.error("Error fetching customers:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get a customer by ID
exports.getCustomerById = async (req, res) => {
  try {
    const { id } = req.params;
    const customer = await Customer.findById(id);
    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }
    res.status(200).json(customer);
  } catch (error) {
    console.error("Error fetching customer by ID:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update a customer by ID
exports.updateCustomerById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phoneNumber, address } = req.body;

    // Check if customer exists
    const existingCustomer = await Customer.findById(id);
    if (!existingCustomer) {
      return res.status(404).json({ error: "Customer not found" });
    }

    // Check if customer with the same email already exists
    if (email && email !== existingCustomer.email) {
      const existingEmail = await Customer.findOne({ email });
      if (existingEmail) {
        return res.status(400).json({ error: "Customer with this email already exists" });
      }
    }

    // Update customer
    existingCustomer.name = name || existingCustomer.name;
    existingCustomer.email = email || existingCustomer.email;
    existingCustomer.phoneNumber = phoneNumber || existingCustomer.phoneNumber;
    existingCustomer.address = address || existingCustomer.address;

    const updatedCustomer = await existingCustomer.save();
    res.status(200).json(updatedCustomer);
  } catch (error) {
    console.error("Error updating customer by ID:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete a customer by ID
exports.deleteCustomerById = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if customer has associated bills
    const associatedBills = await Bill.find({ customer: id });
    if (associatedBills.length > 0) {
      return res.status(400).json({ error: "Customer has associated bills. Delete the bills first." });
    }

    const deletedCustomer = await Customer.findByIdAndDelete(id);
    if (!deletedCustomer) {
      return res.status(404).json({ error: "Customer not found" });
    }
    res.status(200).json({ message: "Customer deleted successfully" });
  } catch (error) {
    console.error("Error deleting customer by ID:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
