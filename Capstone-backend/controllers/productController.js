// // controllers/productController.js
// const Product = require('../models/product');
// const Bill = require('../models/bill');

// // Create a new product
// exports.createProduct = async (req, res) => {
//   try {
//     const { name, description, price, stockQuantity } = req.body;

//     const newProduct = new Product({
//       name,
//       description,
//       price,
//       stockQuantity
//     });

//     const savedProduct = await newProduct.save();
//     res.status(201).json(savedProduct);
//   } catch (error) {
//     console.error("Error creating product:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

// // Get all products
// exports.getAllProducts = async (req, res) => {
//   try {
//     const products = await Product.find();
//     res.status(200).json(products);
//   } catch (error) {
//     console.error("Error fetching products:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

// // Get a product by ID
// exports.getProductById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const product = await Product.findById(id);
//     if (!product) {
//       return res.status(404).json({ error: "Product not found" });
//     }
//     res.status(200).json(product);
//   } catch (error) {
//     console.error("Error fetching product by ID:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

// // Update a product by ID
// exports.updateProductById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { name, description, price, stockQuantity } = req.body;

//     // Check if product exists
//     const existingProduct = await Product.findById(id);
//     if (!existingProduct) {
//       return res.status(404).json({ error: "Product not found" });
//     }

//     // Update product
//     existingProduct.name = name || existingProduct.name;
//     existingProduct.description = description || existingProduct.description;
//     existingProduct.price = price || existingProduct.price;
//     existingProduct.stockQuantity = stockQuantity || existingProduct.stockQuantity;

//     const updatedProduct = await existingProduct.save();
//     res.status(200).json(updatedProduct);
//   } catch (error) {
//     console.error("Error updating product by ID:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

// // Delete a product by ID
// exports.deleteProductById = async (req, res) => {
//   try {
//     const { id } = req.params;

//     // Check if product is associated with any bills
//     const associatedBills = await Bill.find({ products: id });
//     if (associatedBills.length > 0) {
//       return res.status(400).json({ error: "Product is associated with bills. Remove it from the bills first." });
//     }

//     const deletedProduct = await Product.findByIdAndDelete(id);
//     if (!deletedProduct) {
//       return res.status(404).json({ error: "Product not found" });
//     }
//     res.status(200).json({ message: "Product deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting product by ID:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };
// const Product = require('../models/product');
// const Bill = require('../models/bill');

// // Create a new product
// exports.createProduct = async (req, res) => {
//     try {
//       const { id, name, description, price, stockQuantity, imageUrl } = req.body;
  
//       const newProduct = new Product({
//         id,
//         name,
//         description,
//         price,
//         stockQuantity,
//         imageUrl
//       });

//     const savedProduct = await newProduct.save();
//     res.status(201).json(savedProduct);
//   } catch (error) {
//     console.error("Error creating product:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

// // Get all products
// exports.getAllProducts = async (req, res) => {
//   try {
//     const products = await Product.find();
//     res.status(200).json(products);
//   } catch (error) {
//     console.error("Error fetching products:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

// // Get a product by ID
// exports.getProductById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const product = await Product.findById(id);
//     if (!product) {
//       return res.status(404).json({ error: "Product not found" });
//     }
//     res.status(200).json(product);
//   } catch (error) {
//     console.error("Error fetching product by ID:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

// // Update a product by ID
// exports.updateProductById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { name, description, price, stockQuantity, imageUrl } = req.body;

//     // Check if product exists
//     const existingProduct = await Product.findById(id);
//     if (!existingProduct) {
//       return res.status(404).json({ error: "Product not found" });
//     }

//     // Update product fields
//     existingProduct.name = name || existingProduct.name;
//     existingProduct.description = description || existingProduct.description;
//     existingProduct.price = price || existingProduct.price;
//     existingProduct.stockQuantity = stockQuantity || existingProduct.stockQuantity;
//     existingProduct.imageUrl = imageUrl || existingProduct.imageUrl; // Update imageUrl if provided

//     const updatedProduct = await existingProduct.save();
//     res.status(200).json(updatedProduct);
//   } catch (error) {
//     console.error("Error updating product by ID:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

// // Delete a product by ID
// exports.deleteProductById = async (req, res) => {
//   try {
//     const { id } = req.params;

//     // Check if product is associated with any bills
//     const associatedBills = await Bill.find({ products: id });
//     if (associatedBills.length > 0) {
//       return res.status(400).json({ error: "Product is associated with bills. Remove it from the bills first." });
//     }

//     const deletedProduct = await Product.findByIdAndDelete(id);
//     if (!deletedProduct) {
//       return res.status(404).json({ error: "Product not found" });
//     }
//     res.status(200).json({ message: "Product deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting product by ID:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };
const Product = require('../models/product');
const Bill = require('../models/bill');

// Create a new product
exports.createProduct = async (req, res) => {
  try {
    const { id, name, description, price, stockQuantity, imageUrl } = req.body;

    const newProduct = new Product({
      id, // Use id instead of _id
      name,
      description,
      price,
      stockQuantity,
      imageUrl
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get a product by ID
exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findOne({ id }); // Find by id
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update a product by ID
exports.updateProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, stockQuantity, imageUrl } = req.body;

    // Update product
    const updatedProduct = await Product.findOneAndUpdate(
      { id }, // Find by id
      { name, description, price, stockQuantity, imageUrl }, // Update fields
      { new: true } // Return updated document
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error("Error updating product by ID:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete a product by ID
exports.deleteProductById = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if product is associated with any bills
    const associatedBills = await Bill.find({ products: id });
    if (associatedBills.length > 0) {
      return res.status(400).json({ error: "Product is associated with bills. Remove it from the bills first." });
    }

    const deletedProduct = await Product.findOneAndDelete({ id }); // Find and delete by id
    if (!deletedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product by ID:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
