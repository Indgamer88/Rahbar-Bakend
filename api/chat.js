const { GoogleGenerativeAI } = require("@google/generative-ai");

module.exports = async (req, res) => {
    // HopWeb ke liye permission (CORS)
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

    const apiKey = process.env.GEMINI_API_KEY;
    
    try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ 
            model: "gemini-1.5-flash",
            systemInstruction: "Tumhara naam Rahbar hai. Ek neik Islamic mentor ki tarah jawab do."
        });

        const { prompt } = req.body;
        const result = await model.generateContent(prompt);
        const response = await result.response;
        
        res.status(200).json({ text: response.text() });
    } catch (error) {
        res.status(500).json({ error: "API Error: " + error.message });
    }
};
