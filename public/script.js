const themeToggle = document.querySelector(".theme-Toggle");
promptForm = document.querySelector(".prompt-from");
const promptInput = document.querySelector(".prompt-input");
const promptBtn = document.querySelector(".prompt-btn");
const generateBtn = document.querySelector(".generate-btn");
const modelSelect = document.getElementById("model-select");
const countSelect = document.getElementById("count-select");
const ratioSelect = document.getElementById("ratio-select");
const gridGallery = document.querySelector(".gallery-grid");

const BACKEND_URL = "https://ai-image-generator-8hof.onrender.com/generate-image";

const examplePrompts = [
    "A futuristic cyberpunk city glowing in neon lights with flying cars in the sky, cinematic view",
    "A magical forest with glowing mushrooms and a crystal-clear river under a starry night",
    "A dragon flying over an ancient castle during a fiery sunset, fantasy art style",
    "A portrait of a young woman painted in Van Gogh’s Starry Night style",
    "A Japanese garden in watercolor painting style with cherry blossoms falling",
    "A surreal dreamscape with floating islands and giant clocks melting in the sky, inspired by Salvador Dalí",
    "A golden retriever puppy playing in a sunflower field, ultra-realistic photo",
    "A plate of sushi on a wooden table with cinematic lighting, food photography style",
    "An astronaut standing on Mars looking at Earth in the sky, realistic detail",
    "A cartoon-style video game landscape with pixel art mountains and retro 8-bit vibes"
];

//Set theme based on saved preference or system default
(() => {
    const saveTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    const isDarkTheme = saveTheme === "dark" ||(!saveTheme && systemPrefersDark);
    document.body.classList.toggle("dark-theme", isDarkTheme);
    themeToggle.querySelector("i").classList = isDarkTheme ? "fa-solid fa-sun" : "fa-solid fa-moon";
}) ();

//Switch between light and dark themes
const toggleTheme = () => {
    const isDarkTheme = document.body.classList.toggle("dark-theme");
    localStorage.setItem("theme", isDarkTheme ? "dark" : "light");
    themeToggle.querySelector("i").classList = isDarkTheme ? "fa-solid fa-sun" : "fa-solid fa-moon";
};

//Calculate width/height based on chosen ratio
// const getImageDimensions = (aspectRatio, baseSize = 512) => {
//     const [width, height] = aspectRatio.split("/").map(Number);
//     const scaleFactor = baseSize / Math.sqrt(width * height);

//     let calculateWidth = Math.round(width * scaleFactor);
//     let calculateHeight = Math.round(height * scaleFactor);

//     //Ensures dimensions are multiple of 16 (AI model requirements)
//     calculateWidth = Math.floor(calculateWidth / 16) * 16;
//     calculateHeight = Math.floor(calculateHeight / 16) * 16;

//     return {width: calculateWidth, height: calculateHeight};
// };

// Replace loading spinner with the actual image
const updateImageBox = (imgIndex, imgUrl) => {
    const imgBox = document.getElementById(`img-box-${imgIndex}`);
    if (!imgBox) return;

    imgBox.classList.remove("loading");
    imgBox.innerHTML = `<img src="${imgUrl}" class="result-img">
        <div class="img-layout">
            <a href="${imgUrl}" class="img-download-btn" download="${Date.now()}.png">
                <i class="fa-solid fa-download"></i>
            </a>
        </div>
    `;
}

// Send requests to Hugging Face API to create images
// const generateImages = async (selectModel, imageCount, aspectRatio, promptText) => {
//     // const MODEL_URL = `https://api-inference.huggingface.co/models/${selectModel}`;
//     const {width, height} = getImageDimensions(aspectRatio);
//     generateBtn.setAttribute("disabled", "true");

//     // Create an array of image generation promises
//     const imagePromises = Array.from({length: imageCount}, async(_, i) => {

//         // Send request to the AI model API
//         try {
//             const response = await fetch(BACKEND_URL, {
//                 headers: {
//                     Authorization: `Bearer ${API_KEY}`,
//                     "Content-Type": "application/json",
//                     "x-use-cache": "false",
//                 },
//                 method: "POST",
//                 body: JSON.stringify({
//                     inputs: promptText,
//                     parameters: {width, height},
//                     options: {wait_for_model: true, user_cache: false},
//                 }),
//             });

//             if (!response.ok) throw new Error((await response.json())?.error);

//             // Convert response to an URL and update the image box
//             const result = await response.blob();
//             updateImageBox(i, URL.createObjectURL(result));
//         } catch (error) {
//         console.log(error);
//         const imgBox = document.getElementById(`img-box-${i}`);
//         imgBox.classList.remove("loading", "error");
//         imgBox.querySelector(".status-text").textContent = "Generation failed! Check console for more details."
//         }
//     })

//     await Promise.allSettled(imagePromises);
//     generateBtn.removeAttribute("disabled");

// };

// Send requests to your Node.js Backend to create images
const generateImages = async (selectModel, imageCount, aspectRatio, promptText) => {
    // The dimension calculation logic is now handled in the backend
    generateBtn.setAttribute("disabled", "true");

    // Create an array of image generation promises
    const imagePromises = Array.from({length: imageCount}, async(_, i) => {
        const imgBox = document.getElementById(`img-box-${i}`);

        try {
            // 1. Fetch from your Node.js server endpoint
            const response = await fetch(BACKEND_URL, {
                method: "POST",
                headers: {
                    // Tell the server we are sending JSON data
                    "Content-Type": "application/json",
                },
                // 2. Send all required parameters to the backend
                body: JSON.stringify({
                    promptText: promptText,
                    selectModel: selectModel,
                    aspectRatio: aspectRatio,
                }),
            });

            if (!response.ok) {
                // If the backend returns an error (400, 500), try to get the message
                const errorData = await response.json().catch(() => ({ message: "Server communication error." }));
                throw new Error(errorData.error || errorData.message);
            }

            // 3. The backend returns the raw image data (Blob/Buffer)
            const result = await response.blob();
            // Create a local URL for the image and update the box
            updateImageBox(i, URL.createObjectURL(result));
            
        } catch (error) {
            console.error("Generation failed:", error);
            if (imgBox) {
                imgBox.classList.remove("loading");
                imgBox.classList.add("error");
                // Display the error message from the server
                const errorMessage = error.message || "Generation failed! Check console or server logs.";
                imgBox.querySelector("p").textContent = errorMessage.substring(0, 100); // Truncate for display
            }
        }
    });

    await Promise.allSettled(imagePromises);
    generateBtn.removeAttribute("disabled");
};

const createImageBoxes = (selectModel, imageCount, aspectRatio, promptText) => {
    gridGallery.innerHTML = "";

    for (let i = 0; i < imageCount; i++) {
        gridGallery.innerHTML += 
        `<div class="img-box loading" id="img-box-${i}" style="aspect-ratio: ${aspectRatio}">
            <div class="status-container">
                <div class="spinner"></div>
                <i class="fa-solid fa-triangle-exclamation"></i>
                <p>Generating...</p>
            </div>
        </div>`;
    }

    generateImages(selectModel, imageCount, aspectRatio, promptText);
}

//Handle form submision
const handleFormSubmit = (e) => {
    e.preventDefault();

    //Get form values
    selectModel = modelSelect.value;
    imageCount = parseInt(countSelect.value) || 1;
    aspectRatio = ratioSelect.value || "1/1";
    const promptText = promptInput.value.trim();

    createImageBoxes(selectModel, imageCount, aspectRatio, promptText);
};

//  Fill prompt input with random example
promptBtn.addEventListener("click", () => {
    prompt = examplePrompts[Math.floor(Math.random() * examplePrompts.length)];
    promptInput.value = prompt;
    promptInput.focus();

});

promptForm.addEventListener("submit", handleFormSubmit);

themeToggle.addEventListener("click", toggleTheme);