const { GoogleGenerativeAI } = require("@google/generative-ai");

module.exports = async (req, res) => {
    // 1. CORS Headers (HopWeb connection allow karne ke liye)
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    // 2. Browser ki pre-flight request handle karna
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // 3. GET request par message dikhana (Testing ke liye)
    if (req.method === 'GET') {
        return res.status(200).send("Rahbar AI Backend is Live and CORS is Fixed!");
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        return res.status(500).json({ error: "Vercel Settings mein API Key nahi mili!" });
    }

    try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ 
            model: "gemini-1.5-flash",
            systemInstruction: "Tumhara naam Rahbar hai. Tum ek Islamic scholar ho."
        });

        const { prompt } = req.body;
        if (!prompt) {
            return res.status(400).json({ error: "Sawal khali hai." });
        }

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        
        return res.status(200).json({ text: text });
    } catch (error) {
        console.error("Gemini Error:", error);
        return res.status(500).json({ error: "AI Error: " + error.message });
    }
};
