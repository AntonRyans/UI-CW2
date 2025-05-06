// Default translation dictionary
const defaultDict = {
    "hello": "hiya",
    "friend": "mucker",
    "tired": "wrecked",
    "crazy": "mental",
    "fight": "scrap",
    "drunk": "steaming",
    "police": "peelers",
    "food": "scran",
    "great": "dead on",
    "how are you?": "what's the craic?",
    "what’s the craic?": "how are you?",
    "alright": "dead on",
    "you’re joking": "away on!",
    "very tired": "wrecked",
    "really annoying": "melter",
    "calm down": "wind yer neck in",
    "don’t be ridiculous": "catch yourself on",
    "very drunk": "steamin'",
    "extremely busy": "flat out like a lizard drinking",
    "dirty": "boggin'",
    "embarrassed": "scundered",
    "trainers": "gutties",
    "fool": "buck eejit",
    "little walk": "wee dander",
    "full of nonsense": "full of the bap",
    "that guy": "yer man",
    "feisty": "wee rocket",
    "freezing": "foundered",
    "keep going": "keep 'er lit"
};

// Initialize or load dictionary from localStorage
if (!localStorage.getItem('belfastDict')) {
    localStorage.setItem('belfastDict', JSON.stringify(defaultDict));
}

let isEnglishToBelfast = true;

// DOM Elements
const input = document.getElementById('inputText');
const output = document.getElementById('outputText');
const translateBtn = document.getElementById('translateBtn');
const swapBtn = document.getElementById('swapBtn');
const directionText = document.getElementById('directionText');
const addForm = document.getElementById('addForm');
const englishInput = document.getElementById('englishInput');
const belfastInput = document.getElementById('belfastInput');
const suggestionsContainer = document.getElementById('suggestions');

// Load dictionary from localStorage
function loadDict() {
    return JSON.parse(localStorage.getItem('belfastDict'));
}

// Update the direction display
function updateDirectionText() {
    directionText.textContent = isEnglishToBelfast
        ? "Current Direction: English → Belfast"
        : "Current Direction: Belfast → English";
}

// Translate text using dictionary
function translateText(text, dict) {
    let result = text;
    const sortedKeys = Object.keys(dict).sort((a, b) => b.length - a.length);
    for (let key of sortedKeys) {
        const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const pattern = new RegExp(`\\b${escapedKey}\\b`, 'gi');
        result = result.replace(pattern, (match) => {
            const translation = dict[key];
            return match[0] === match[0].toUpperCase()
                ? translation.charAt(0).toUpperCase() + translation.slice(1)
                : translation;
        });
    }
    return result;
}

// Translate on button click
translateBtn.addEventListener('click', () => {
    const dict = loadDict();
    const activeDict = isEnglishToBelfast
        ? dict
        : Object.fromEntries(Object.entries(dict).map(([k, v]) => [v, k]));
    output.value = translateText(input.value.toLowerCase(), activeDict);
});

// Handle swap
swapBtn.addEventListener('click', () => {
    isEnglishToBelfast = !isEnglishToBelfast;
    updateDirectionText();
    output.value = "";
});

// Add a new phrase
addForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const eng = englishInput.value.trim().toLowerCase();
    const slang = belfastInput.value.trim().toLowerCase();
    if (!eng || !slang) return;

    const dict = loadDict();
    dict[eng] = slang;
    localStorage.setItem('belfastDict', JSON.stringify(dict));

    englishInput.value = "";
    belfastInput.value = "";
    alert(`Added: "${eng}" → "${slang}"`);
});

// Fuse.js integration for fuzzy matching with frequency
const phraseList = Object.entries(loadDict()).map(([phrase, slang]) => ({
    phrase: phrase,
    slang: slang,
    frequency: Math.floor(Math.random() * 10) + 1 // Mock frequency
}));

const fuse = new Fuse(phraseList, {
    keys: ['phrase', 'slang'],
    includeScore: true,
    threshold: 0.4, // Adjust sensitivity
    distance: 100,
});

// Show dynamic suggestions with fuzzy matching and frequency prioritization
input.addEventListener('input', () => {
    const typed = input.value.trim().toLowerCase();

    // Fuzzy search
    const results = fuse.search(typed)
        .sort((a, b) => b.item.frequency - a.item.frequency) // Prioritize by frequency
        .slice(0, 5); // Limit suggestions

    // Clear previous suggestions
    suggestionsContainer.innerHTML = "";

    // Show new suggestions
    results.forEach(({ item }) => {
        const suggestion = isEnglishToBelfast ? item.phrase : item.slang;
        const btn = document.createElement('button');
        btn.textContent = `${suggestion}`;
        btn.addEventListener('click', () => {
            input.value = suggestion;
            suggestionsContainer.innerHTML = "";
            output.value = "";
        });
        suggestionsContainer.appendChild(btn);
    });

    // Position suggestion box under the input
    const rect = input.getBoundingClientRect();
    suggestionsContainer.style.left = `${rect.left + window.scrollX}px`;
    suggestionsContainer.style.top = `${rect.bottom + window.scrollY}px`;
    suggestionsContainer.style.width = `${rect.width}px`;
});

// Initialize
updateDirectionText();
