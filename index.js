const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Root route to check if server is alive
app.get('/', (req, res) => {
    res.send('Rahbar AI Backend is Running 24/7 on Koyeb!');
});

// Main Chat Route
app.post('/api/ask-deen', async (req, res) => {
    try {
        const { query, language } = req.body;

        // Aapka purana API endpoint ya logic yahan aayega
        // Example: External API call
        const response = await axios.post('https://deen-ki-baaten-api.vercel.app/api/ask-deen', {
            query: query,
            language: language || 'Hindi'
        });

        res.json(response.data);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ text: "Maaf kijiyega, server mein kuch dikkat hai." });
    }
});

// Important: Koyeb requires 0.0.0.0 host
const PORT = process.env.PORT || 8000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is live on port ${PORT}`);
});
