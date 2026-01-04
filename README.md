# 📸 AI Image Generator — Full-Stack Web App

![NodeJS Badge](https://img.shields.io/badge/Backend-Node.js-green?style=for-the-badge&logo=nodedotjs)
![HuggingFace Badge](https://img.shields.io/badge/AI-Hugging%20Face-yellow?style=for-the-badge&logo=huggingface)
![Vercel Badge](https://img.shields.io/badge/Frontend-Vercel-black?style=for-the-badge&logo=vercel)
![Status Badge](https://img.shields.io/badge/Status-Live-success?style=for-the-badge)

An advanced full-stack AI Image Generator that transforms text prompts into high-quality visual art. Built with **Node.js** and the **Hugging Face Inference API**, featuring a secure backend proxy, responsive design, and dynamic image customization.

---

## 🚀 Live Demo

| Component | Status | Link |
| :--- | :--- | :--- |
| **Frontend** | 🟢 Online | [**Visit App (Vercel)**](https://ai-image-generator-tan-five.vercel.app/) |
| **Backend** | 🟢 Online | [**API Health (Render)**](https://ai-image-generator-8hof.onrender.com) |

---

## 🌟 Key Features

* **🎨 AI Image Generation:** Powered by Hugging Face models (`@huggingface/inference`) for realistic and artistic outputs.
* **⚙️ Secure Full-Stack:** Frontend (Vercel) communicates securely with a Backend (Render) to protect API keys.
* **🌓 Dark & Light Mode:** Automatic system detection with a manual toggle switch for visual comfort.
* **📐 Custom Aspect Ratios:** Dynamic pixel calculation for Square, Portrait, and Landscape formats.
* **🎲 Smart Randomizer:** One-click random prompt generation to spark creativity.
* **💾 Instant Downloads:** Save generated images directly to your device with one click.
* **📱 Fully Responsive:**
    * **Desktop:** 4-column grid
    * **Tablet:** 2-column grid
    * **Mobile:** 1-column layout

---

## 🛠️ Tech Stack

### Frontend
* **HTML5 / CSS3:** Custom responsive grid and theme variables.
* **JavaScript (ES6+):** Async/Await for API handling and DOM manipulation.
* **Hosting:** Vercel (CD/CI).

### Backend
* **Node.js & Express:** REST API handling.
* **Hugging Face SDK:** Direct integration with text-to-image models.
* **CORS:** Configured for secure cross-origin resource sharing.
* **Hosting:** Render.

---

## 📂 Project Architecture

```text
AI-Image-Generator/
│
├── public/                 # 🎨 Frontend (Vercel)
│   ├── index.html          # Main UI structure
│   ├── style.css           # Styling & Responsive Layouts
│   └── script.js           # API calls & DOM manipulation
│
├── backend/                # 🔌 Backend (Render)
│   ├── server.js           # Express server & Logic
│   ├── package.json        # Backend dependencies
│   └── .env                # API Keys (Not pushed to Git)
│
├── vercel.json             # Vercel routing configuration
└── README.md               # Documentation

🚀 Getting Started
Prerequisites
Node.js (v18 or higher)

A Hugging Face Access Token (Get it here)

Installation
Clone the repository

Bash

git clone [https://github.com/yourusername/AI-Image-Generator.git](https://github.com/yourusername/AI-Image-Generator.git)
Install Backend Dependencies Navigate to the backend folder and install required packages:

Bash

cd backend
npm install
Configure Environment Create a .env file in the backend directory:

Code snippet

HUGGING_FACE_API_KEY=hf_xxxxxxxxxxxxxxxxxxxxxxx
PORT=3000
Start the Server

Bash

node server.js
Launch Frontend Open public/index.html in your browser (or use Live Server).

🔌 API Endpoint
The backend exposes a secure endpoint used by the frontend.

POST /generate-image

Body:

JSON

{
  "prompt": "A neon cyberpunk city",
  "model": "stabilityai/stable-diffusion-xl-base-1.0",
  "aspectRatio": "16:9",
  "numImages": 1
}
🔮 Future Enhancements
[ ] User Accounts: Authentication to save favorite images.

[ ] History Tab: View previously generated images in the session.

[ ] Social Sharing: Direct share to Twitter/Instagram.

[ ] Upscaling: Integration with super-resolution models.

🏆 Acknowledgements
Hugging Face – For providing state-of-the-art AI models.

Font Awesome – For the UI icons.

Google Fonts – Typography.

Render & Vercel – For excellent free-tier hosting.

<div align="center"> <sub>Built with ❤️ by <a href="https://github.com/prashantmore45">Prashant More</a></sub> </div>
