// server.js
const express = require('express');
const app = express();
const cors = require('cors');
const careRoutes = require('./routes/careRoutes');
const pool = require('./database');

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from public
app.use(express.static('public'));

// Routes
app.use('/api/care', careRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});