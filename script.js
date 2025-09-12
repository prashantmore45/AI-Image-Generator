const themeToggle = document.querySelector(".theme-Toggle");
promptForm = document.querySelector(".prompt-from");
const promptInput = document.querySelector(".prompt-input");
const promptBtn = document.querySelector(".prompt-btn");
const modelSelect = document.getElementById("model-select");
const countSelect = document.getElementById("count-select");
const ratioSelect = document.getElementById("ratio-select");
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
}

//Handle form submision
const handleFormSubmit = (e) => {
    e.preventDefault();

    //Get form values
    selectModel = modelSelect.value;
    selectCount = parseInt(countSelect.value) || 1;
    aspectRatio = ratioSelect.value || "1/1";
    const promptText = promptInput.value.trim();

    console.log(selectModel, selectCount, aspectRatio, promptText);
};

//  Fill prompt input with random example
promptBtn.addEventListener("click", () => {
    prompt = examplePrompts[Math.floor(Math.random() * examplePrompts.length)];
    promptInput.value = prompt;
    promptInput.focus();

});

promptForm.addEventListener("submit", handleFormSubmit);

themeToggle.addEventListener("click", toggleTheme);