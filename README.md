📸 AI Image Generator — Full-Stack Web App

- An advanced full-stack AI Image Generator built with:

> Frontend: HTML, CSS, JavaScript (Vercel Hosted)

> Backend: Node.js (Express) using HuggingFace Inference API (Render Hosted)

- Users can generate high-quality AI images by entering text prompts, selecting models, adjusting aspect ratios, and choosing image count.
- Features include dark/light themes, random prompts, loading animations, error handling, and image downloads.

🚀 Features

🎨 AI Image Generation
- Uses HuggingFace Inference API (@huggingface/inference) for real image generation based on text prompts.

⚙ Full-Stack Architecture

- Frontend deployed on Vercel
- Backend API deployed on Render
- Secure communication via CORS
- .env protected API key

🌓 Dark / Light Theme
- Automatic theme detection + toggle button.

🔀 Smart Random Prompts
- One-click prompt generation.

💾 Download Images
- Each generated image can be downloaded.

⏳ Loading State + Error Handling
- Spinner + clear error messages if model fails or API is busy.

📱 Fully Responsive

> Optimized layout for:

- Desktop (4-column grid)
- Tablet (2-column)
- Mobile (1-column)

🏗️ Project Architecture

AI-Image-Generator/
│
├── public/               # Frontend (deployed on Vercel)
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── backend/              # Backend API (deployed on Render)
│   ├── server.js
│   ├── package.json
│   ├── package-lock.json
│   └── .env  (ignored in Git)
│
├── vercel.json           # Vercel routing configuration
└── README.md             # Documentation


🔌 Backend API (Node + Express)

> Endpoint
POST /generate-image

* Features:

- CORS configured for secure frontend-only access
- Uses HuggingFace text-to-image models
- Dynamically computes pixel dimensions from aspect ratio
- Returns raw image buffer directly
- Works with multiple model IDs

* Tech:

- Node.js
- Express.js
- Hugging Face SDK
- Render Deployment
- CORS Protection
- Environment Variables (.env)

🌐 Deployment URLs

Frontend (Vercel):
➤ [your-frontend-url.vercel.app](https://ai-image-generator-tan-five.vercel.app/)

Backend (Render):
➤ [your-backend-url.onrender.com](https://ai-image-generator-8hof.onrender.com)

🎮 How to Use

- Enter a creative prompt (example: "A neon cyberpunk city at night")

* Pick:

1. Model
2. Image count
3. Aspect ratio
4. Click Generate

- Watch the spinner → Images appear

> Download any image

Or click 🎲 to get a random example prompt

📱 Responsive Design

> Device	Layout:

- Desktop	4 images per row
- Tablet	2 images per row
- Mobile	1 image per row

📸 Screenshots
(Add screenshots here)

> Light Theme

> Dark Theme

> Image Generation Demo


🔒 Environment Variables

> Backend requires:

- HUGGING_FACE_API_KEY=hf_xxxxxxxxxxxxxxxxxxxxxxx

- Never commit your API key — it stays only on Render dashboard.

🛠️ Installation (Local Development)

1️⃣ Clone the repo
- git clone https://github.com/yourusername/AI-Image-Generator.git

2️⃣ Install backend dependencies
- cd backend
- npm install

3️⃣ Add your .env file
- HUGGING_FACE_API_KEY=your_api_key_here

4️⃣ Start backend
- node server.js

5️⃣ Open frontend

> Simply open:
public/index.html

🏆 Acknowledgements

🤗 Hugging Face – Image generation models

🎨 Font Awesome – Icons

🔤 Google Fonts

⚡ Vercel – Frontend hosting

🚀 Render – Backend hosting

🔮 Future Enhancements

🔐 User accounts + credits

🖼️ Generation history

📤 Social media sharing

🚀 Support for more models (SDXL, Flux, Kandinsky, etc.)

👁️ Real-time image preview

🎞️ Image-to-image + inpainting support