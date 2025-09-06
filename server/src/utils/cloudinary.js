const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: '244639356235345',
  api_key: 'HPQejweplVCwlU9sKMcmIHJzQ_Y',
  api_secret: process.env.CLOUDINARY_SECRET, // store secret in .env
});

module.exports = cloudinary;