const inputText = document.getElementById("inputText");
const outputText = document.getElementById("outputText");
const sourceLang = document.getElementById("sourceLang");
const targetLang = document.getElementById("targetLang");

const languages = {
  af: "Afrikaans",
  ar: "Arabic",
  az: "Azerbaijani",
  zh: "Chinese",
  cs: "Czech",
  en: "English",
  fr: "French",
  de: "German",
  hi: "Hindi",
  it: "Italian",
  ja: "Japanese",
  ko: "Korean",
  pl: "Polish",
  pt: "Portuguese",
  ru: "Russian",
  es: "Spanish",
  tr: "Turkish",
  uz: "Uzbek"
};

Object.entries(languages).forEach(([code, name]) => {
  sourceLang.innerHTML += `<option value="${code}">${name}</option>`;
  targetLang.innerHTML += `<option value="${code}">${name}</option>`;
});

sourceLang.value = "ru";
targetLang.value = "en";

async function translateText() {
  const text = inputText.value;
  const from = sourceLang.value;
  const to = targetLang.value;
  const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${from}|${to}`);
  const data = await response.json();
  if (data.responseData?.translatedText) {
    outputText.value = data.responseData.translatedText;
  }
}

function speakText() {
  const text = outputText.value;
  const to = targetLang.value;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = to;
  speechSynthesis.speak(utterance);
}