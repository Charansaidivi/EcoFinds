const Product = require('../models/Product');
const cloudinary = require('../utils/cloudinary');
const fs = require('fs');
const path = require('path');

exports.createProduct = async (req, res) => {
  try {
    const { title, description, category, price, longitude, latitude } = req.body;
    console.log("Creating product with data:", req.body);
    if (!req.file) return res.status(400).json({ message: 'Image required' });

    // Save product with local image path first
    const localImagePath = req.file.path;
    const product = new Product({
      title,
      description,
      category,
      price,
      image: localImagePath, // Store local path initially
      location: {
        type: 'Point',
        coordinates: [parseFloat(longitude), parseFloat(latitude)],
      },
      owner: req.user._id,
    });

    await product.save();

    // Add product to user's listedProducts
    req.user.listedProducts.push(product._id);
    await req.user.save();

    // Respond immediately
    res.status(201).json(product);

    // Upload to Cloudinary in the background
    cloudinary.uploader.upload(localImagePath, async (error, result) => {
      if (!error && result && result.secure_url) {
        // Update product with Cloudinary URL
        await Product.findByIdAndUpdate(product._id, { image: result.secure_url });
        // Optionally, delete the local file after upload
        fs.unlink(localImagePath, () => {});
      }
    });

  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ message: 'Error creating product', error });
  }
};

exports.getUserListings = async (req, res) => {
  try {
    const products = await Product.find({ owner: req.user._id }).sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch listings" });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({ _id: req.params.id, owner: req.user._id });
    if (!product) {
      return res.status(404).json({ message: "Product not found or unauthorized" });
    }
    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete product" });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { title, description, category, price, longitude, latitude } = req.body;
    const updateFields = {
      title,
      description,
      category,
      price,
      location: {
        type: 'Point',
        coordinates: [parseFloat(longitude), parseFloat(latitude)],
      },
    };

    // If a new image is uploaded, handle it (optional)
    if (req.file) {
      updateFields.image = req.file.path; // or handle cloudinary upload as in createProduct
    }

    const product = await Product.findOneAndUpdate(
      { _id: req.params.id, owner: req.user._id },
      updateFields,
      { new: true }
    );
    if (!product) {
      return res.status(404).json({ message: "Product not found or unauthorized" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Failed to update product" });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id, owner: req.user._id });
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch product" });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('owner', 'username');
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error });
  }
};