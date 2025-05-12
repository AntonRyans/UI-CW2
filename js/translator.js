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

// Utilities
const getStoredDict = () => JSON.parse(localStorage.getItem('belfastDict'));
const saveDict = (dict) => localStorage.setItem('belfastDict', JSON.stringify(dict));

if (!getStoredDict()) saveDict(defaultDict);

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
const darkToggle = document.getElementById('darkModeToggle');
const body = document.body;

// UI Updates
const updateDirectionText = () => {
    directionText.textContent = isEnglishToBelfast
        ? "Current Direction: English → Belfast"
        : "Current Direction: Belfast → English";
};

// Translation Logic
const translateText = (text, dict) => {
    const keys = Object.keys(dict).sort((a, b) => b.length - a.length);
    return keys.reduce((result, key) => {
        const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(`\\b${escapedKey}\\b`, 'gi');
        return result.replace(regex, (match) =>
            match[0] === match[0].toUpperCase()
                ? dict[key].charAt(0).toUpperCase() + dict[key].slice(1)
                : dict[key]
        );
    }, text);
};

// Events
translateBtn.addEventListener('click', () => {
    const dict = getStoredDict();
    const activeDict = isEnglishToBelfast
        ? dict
        : Object.fromEntries(Object.entries(dict).map(([k, v]) => [v, k]));
    output.value = translateText(input.value, activeDict);
});

swapBtn.addEventListener('click', () => {
    isEnglishToBelfast = !isEnglishToBelfast;
    updateDirectionText();
    output.value = "";
});

addForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const eng = englishInput.value.trim().toLowerCase();
    const slang = belfastInput.value.trim().toLowerCase();
    if (!eng || !slang) return;

    const dict = getStoredDict();
    dict[eng] = slang;
    saveDict(dict);

    englishInput.value = "";
    belfastInput.value = "";
    alert(`Added: "${eng}" → "${slang}"`);
    updateSuggestionsData();
});

// Fuzzy Suggestions
let fuse;
let phraseList = [];

const updateSuggestionsData = () => {
    const dict = getStoredDict();
    phraseList = Object.entries(dict).map(([phrase, slang]) => ({
        phrase, slang,
        frequency: Math.floor(Math.random() * 10) + 1 
    }));

    fuse = new Fuse(phraseList, {
        keys: ['phrase', 'slang'],
        includeScore: true,
        threshold: 0.4,
        distance: 100,
    });
};

input.addEventListener('input', () => {
    const typed = input.value.trim().toLowerCase();
    if (!typed) {
        suggestionsContainer.innerHTML = "";
        return;
    }

    const results = fuse.search(typed)
        .sort((a, b) => b.item.frequency - a.item.frequency)
        .slice(0, 5);

    suggestionsContainer.innerHTML = "";
    results.forEach(({ item }) => {
        const suggestion = isEnglishToBelfast ? item.phrase : item.slang;
        const btn = document.createElement('button');
        btn.textContent = suggestion;
        btn.className = "suggestion-button";
        btn.addEventListener('click', () => {
            input.value = suggestion;
            suggestionsContainer.innerHTML = "";
            output.value = "";
        });
        suggestionsContainer.appendChild(btn);
    });

    const rect = input.getBoundingClientRect();
    suggestionsContainer.style.left = `${rect.left + window.scrollX}px`;
    suggestionsContainer.style.top = `${rect.bottom + window.scrollY}px`;
    suggestionsContainer.style.width = `${rect.width}px`;
});

// Theme handling functions (light/dark)
const applyTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const useDark = savedTheme === 'dark' || (!savedTheme && prefersDark);

    body.classList.toggle('dark-mode', useDark);
    document.querySelector('.dark-images').style.display = useDark ? "block" : "none";
    document.querySelector('.light-images').style.display = useDark ? "none" : "block";
    if (darkToggle) darkToggle.checked = useDark;
};

darkToggle.addEventListener('change', () => {
    const isDark = darkToggle.checked;
    body.classList.toggle('dark-mode', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    applyTheme();
});

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (!localStorage.getItem('theme')) applyTheme();
});

document.addEventListener('DOMContentLoaded', () => {
    applyTheme();
    updateDirectionText();
    updateSuggestionsData();
});

// User session handling (greeting and logout)
document.addEventListener("DOMContentLoaded", () => {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";
    const username = sessionStorage.getItem("username");

    const greetingEl = document.getElementById("personalGreeting");
    const logoutLink = document.getElementById("logoutLink");

    if (!isLoggedIn || !username) {
        window.location.href = "login.html";
        return;
    }

    if (greetingEl) greetingEl.textContent = `👋 Welcome, ${username}!`;
    if (logoutLink) {
        logoutLink.style.display = "inline";
        logoutLink.addEventListener("click", (e) => {
            e.preventDefault();
            sessionStorage.setItem("isLoggedIn", "false");
            sessionStorage.removeItem("username");
            window.location.href = "login.html";
        });
    }
});
