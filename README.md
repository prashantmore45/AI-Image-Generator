# 📸 AI Image Generator (Production Ready)

![HuggingFace Badge](https://img.shields.io/badge/AI-Hugging%20Face-yellow?style=for-the-badge&logo=huggingface)
![NodeJS Badge](https://img.shields.io/badge/Backend-Node.js-green?style=for-the-badge&logo=nodedotjs)
![Status Badge](https://img.shields.io/badge/Status-Live-success?style=for-the-badge)

A fully functional, mobile-responsive AI Image Generator that transforms text prompts into high-quality visual art. Built with **Node.js** and the **Hugging Face Inference API**, it features secure backend proxying, dynamic aspect ratio calculation, and a professional, responsive interface.

## 🌟 Key Features

* **🎨 Advanced AI Engines:** Powered by **Hugging Face Inference API** (Stable Diffusion & other state-of-the-art models).
* **⚡ Secure Full-Stack Architecture:** Frontend (Vercel) communicates securely with a Backend (Render) to keep API keys protected.
* **📐 Smart Customization:** Dynamically calculates pixel dimensions for **Square**, **Portrait**, and **Landscape** aspect ratios.
* **🎲 Creative Tools:** Includes a "Smart Randomizer" for one-click prompt inspiration and batch generation (1-4 images).
* **🌓 Professional UI:**
    * **Dark/Light Mode:** Automatic system detection with a manual toggle switch.
    * **Fully Responsive:** Optimized grids for Desktop (4-col), Tablet (2-col), and Mobile (1-col).
    * **Instant Feedback:** Loading spinners and error handling for API timeouts.
* **💾 Native Downloads:** Direct binary buffer handling allows users to download generated art instantly.

---

## 🛠️ Tech Stack

### Frontend
* **HTML5 / CSS3:** Custom CSS variables for theming and responsive Grid layouts.
* **Vanilla JavaScript:** Lightweight, dependency-free logic for API calls and DOM manipulation.
* **Hosting:** Vercel (CI/CD).

### Backend
* **Node.js & Express:** REST API endpoint and binary data streaming.
* **Hugging Face SDK:** `@huggingface/inference` for model interaction.
* **Security:** CORS protection and Environment Variable management.
* **Hosting:** Render.

---

## 🚀 Getting Started

### Prerequisites
* Node.js (v18 or higher recommended)
* A Hugging Face Access Token (Get it from [Hugging Face Settings](https://huggingface.co/settings/tokens))

### Installation

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/your-username/AI-Image-Generator.git](https://github.com/your-username/AI-Image-Generator.git)
    cd AI-Image-Generator
    ```

2.  **Install Dependencies**
    Navigate to the backend folder and install required packages:
    ```bash
    cd backend
    npm install
    ```

3.  **Configure Environment**
    Create a `.env` file in the `backend` directory:
    ```env
    PORT=3000
    HUGGING_FACE_API_KEY=hf_your_actual_token_here
    ```

4.  **Run the Server**
    ```bash
    node server.js
    ```

5.  **Launch**
    Open `public/index.html` in your browser (or use VS Code Live Server).
    *(The backend runs on localhost:3000, frontend connects via fetch).*

---

## 📂 Project Structure

```text
AI-Image-Generator/
├── public/                 # Frontend Assets
│   ├── index.html          # Main UI Structure
│   ├── style.css           # Responsive Grid & Dark/Light Theme
│   └── script.js           # Logic (Fetch API, UI State, Downloads)
│
├── backend/                # Server Side
│   ├── node_modules/       # Dependencies
│   ├── server.js           # Express Server & Image Buffer Logic
│   ├── package.json        # Project Manifest
│   └── .env                # API Keys (Not shared in repo)
│
├── vercel.json             # Vercel Configuration
└── README.md               # Documentation
