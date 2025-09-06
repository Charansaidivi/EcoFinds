const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const routes = require('./routes');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// CORS configuration
const corsOptions = {
  origin: 'https://eco-finds-self.vercel.app', // your frontend port
  credentials: true,
};

app.use(cors(corsOptions));

// Serve uploads directory for images
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api', routes);

// Error handling middleware (optional)
// app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`EcoFinds backend running on port ${PORT}`);
});

module.exports = app;
