const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: "edulinker",
  api_key: "577272971494898",
  api_secret: "boARy35OlnF6dnPP9URhy9__KBI",
});

module.exports = cloudinary;