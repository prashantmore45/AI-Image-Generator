// server.js (Full Corrected Code using @huggingface/inference)
const express = require('express');
const cors = require('cors');

// Load environment variables (like the API Key) from .env
require('dotenv').config(); 
const { HfInference } = require('@huggingface/inference');

const app = express();
const port = process.env.PORT || 5000;

// 1. DEFINE the API Key by reading from environment variables first.
const HF_API_KEY = process.env.HUGGING_FACE_API_KEY;

// 2. 🛑 Perform Security Check Immediately 
if (!HF_API_KEY) {
    console.error("FATAL ERROR: HUGGING_FACE_API_KEY is not set in the .env file.");
    process.exit(1);
}

// 3. Initialize HfInference client with the now-defined key.
const Hf = new HfInference(HF_API_KEY); 

// --- Middleware Setup ---
app.use(cors({
    origin: [
        "https://ai-image-generator-tan-five.vercel.app",  // your frontend domain
        "http://localhost:3000"
    ],
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
}));

app.options("*", cors());
 
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

// --- Helper Function: Get Image Dimensions (Used for the 'parameters' object) ---
const getImageDimensions = (aspectRatio, baseSize = 512) => {
    try {
        const [width, height] = aspectRatio.split("/").map(Number);
        const scaleFactor = baseSize / Math.sqrt(width * height);

        let calculateWidth = Math.round(width * scaleFactor);
        let calculateHeight = Math.round(height * scaleFactor);

        // Ensures dimensions are multiple of 16 (AI model requirement)
        calculateWidth = Math.floor(calculateWidth / 16) * 16;
        calculateHeight = Math.floor(calculateHeight / 16) * 16;
        
        return {
            width: calculateWidth > 0 ? calculateWidth : 512, 
            height: calculateHeight > 0 ? calculateHeight : 512
        };
    } catch (e) {
        console.error("Error calculating dimensions:", e);
        return { width: 512, height: 512 }; 
    }
};

// 🎨 POST Route for Image Generation
app.post('/generate-image', async (req, res) => {
    const { 
        selectModel, 
        aspectRatio, 
        promptText 
    } = req.body; 
    
    if (!selectModel || !promptText || !aspectRatio) {
        return res.status(400).json({ error: 'Missing prompt, model, or aspect ratio.' });
    }

    try {
        const { width, height } = getImageDimensions(aspectRatio);

        // 2. Call the Inference API using the official SDK (HfInference.textToImage)
        const imageBlob = await Hf.textToImage({
            model: selectModel, // The model ID from your frontend
            inputs: promptText, // The prompt text
            parameters: { 
                width: width, 
                height: height 
            },
            options: {
                wait_for_model: true // Wait for model to load if it's currently idle
            }
        });

        // 3. The SDK returns a Blob; convert it to a Buffer for Express
        const imageBuffer = Buffer.from(await imageBlob.arrayBuffer());
        
        // 4. Send the raw image data back to the frontend
        res.status(200)
           .set('Content-Type', 'image/png')
           .send(imageBuffer);

    } catch (error) {
        console.error(`[${selectModel}] Generation failed. Error:`, error.message);
        
        let userMessage = "Generation failed! The model is busy or encountered an error.";
        
        // Provide better error feedback to the user
        if (error.message && error.message.toLowerCase().includes('model') && error.message.toLowerCase().includes('not found')) {
            userMessage = `Model '${selectModel}' is unavailable or has a different task type. Try 'stabilityai/stable-diffusion-xl-base-1.0'.`;
        } else if (error.message.includes('safetensors')) {
            userMessage = "Model error: Safetensors/load issue. Try a different model.";
        }

        res.status(500).json({ 
            error: error.message,
            message: userMessage
        });
    }
});

// --- Start Server ---
app.listen(port, () => console.log(`🚀 AI Backend running on http://localhost:${port}`));