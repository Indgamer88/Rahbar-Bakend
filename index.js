const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/api/ask-deen', async (req, res) => {
    try {
        const response = await axios.post('https://deen-ki-baaten-api.vercel.app/api/ask-deen', req.body);
        res.json(response.data);
    } catch (e) { res.status(500).send({text: "Error!"}); }
});

// Port 7860 Hugging Face ka default port hai
app.listen(7860, '0.0.0.0', () => console.log('Server Running on 7860'));
