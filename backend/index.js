const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config(); // `.env` file ko read karega
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // JSON body parsing ke liye
app.use('/api/auth', require('./routes/auth'));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection failed:', err));

// Basic Route
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Server listen karega
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
