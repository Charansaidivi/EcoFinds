const Product = require('../models/Product');
const cloudinary = require('../utils/cloudinary');

exports.createProduct = async (req, res) => {
  try {
    const { title, description, category, price, longitude, latitude } = req.body;
    if (!req.file) return res.status(400).json({ message: 'Image required' });

    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload_stream(
      { resource_type: 'image' },
      (error, result) => {
        if (error) throw error;
        return result;
      }
    );
    req.file.stream.pipe(result);

    const product = new Product({
      title,
      description,
      category,
      price,
      image: result.secure_url,
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

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error creating product', error });
  }
};