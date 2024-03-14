// routes/billRoutes.js
const express = require('express');
const router = express.Router();
const billController = require('../controllers/billController');

// Create a new bill
router.post('/', billController.createBill);

// Get all bills
router.get('/', billController.getAllBills);

// Get a bill by ID
router.get('/:id', billController.getBillById);

// Update a bill by ID
router.put('/:id', billController.updateBillById);

// Delete a bill by ID
router.delete('/:id', billController.deleteBillById);

module.exports = router;
