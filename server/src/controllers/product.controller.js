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