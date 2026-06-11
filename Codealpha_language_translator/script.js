const LANGUAGES = {
"auto":"Detect Language",
"en":"English",
"hi":"Hindi",
"fr":"French",
"de":"German",
"es":"Spanish",
"it":"Italian",
"ja":"Japanese",
"ko":"Korean",
"ru":"Russian",
"zh-CN":"Chinese",
"ar":"Arabic",
"pt":"Portuguese",
"tr":"Turkish",
"nl":"Dutch",
"pl":"Polish",
"sv":"Swedish",
"th":"Thai",
"vi":"Vietnamese",
"uk":"Ukrainian",
"el":"Greek",
"fa":"Persian",
"ur":"Urdu",
"bn":"Bengali",
"ta":"Tamil",
"te":"Telugu",
"mr":"Marathi",
"gu":"Gujarati",
"pa":"Punjabi",
"ml":"Malayalam",
"kn":"Kannada",
"or":"Odia",
"ne":"Nepali",
"si":"Sinhala",
"my":"Myanmar",
"am":"Amharic",
"sw":"Swahili",
"af":"Afrikaans",
"sq":"Albanian",
"hy":"Armenian",
"az":"Azerbaijani",
"eu":"Basque",
"be":"Belarusian",
"bs":"Bosnian",
"bg":"Bulgarian",
"ca":"Catalan",
"ceb":"Cebuano",
"hr":"Croatian",
"cs":"Czech",
"da":"Danish",
"eo":"Esperanto",
"et":"Estonian",
"fi":"Finnish",
"gl":"Galician",
"ka":"Georgian",
"ht":"Haitian Creole",
"ha":"Hausa",
"haw":"Hawaiian",
"he":"Hebrew",
"hmn":"Hmong",
"hu":"Hungarian",
"is":"Icelandic",
"id":"Indonesian",
"ga":"Irish",
"jw":"Javanese",
"kk":"Kazakh",
"km":"Khmer",
"ku":"Kurdish",
"ky":"Kyrgyz",
"lo":"Lao",
"la":"Latin",
"lv":"Latvian",
"lt":"Lithuanian",
"lb":"Luxembourgish",
"mk":"Macedonian",
"mg":"Malagasy",
"ms":"Malay",
"mt":"Maltese",
"mn":"Mongolian",
"no":"Norwegian",
"ps":"Pashto",
"ro":"Romanian",
"sm":"Samoan",
"gd":"Scots Gaelic",
"sr":"Serbian",
"sk":"Slovak",
"sl":"Slovenian",
"so":"Somali",
"su":"Sundanese",
"tg":"Tajik",
"tt":"Tatar",
"tk":"Turkmen",
"uz":"Uzbek",
"cy":"Welsh",
"xh":"Xhosa",
"yi":"Yiddish",
"yo":"Yoruba",
"zu":"Zulu"
};

const sourceLang = document.getElementById("sourceLang");
const targetLang = document.getElementById("targetLang");

for(let code in LANGUAGES){

sourceLang.innerHTML +=
`<option value="${code}">${LANGUAGES[code]}</option>`;

if(code !== "auto"){
targetLang.innerHTML +=
`<option value="${code}">${LANGUAGES[code]}</option>`;
}

}

targetLang.value="hi";

document.getElementById("translateBtn")
.addEventListener("click",translateText);

async function translateText(){

const text =
document.getElementById("inputText").value;

const source =
sourceLang.value;

const target =
targetLang.value;

if(!text) return;

const url =
`https://translate.googleapis.com/translate_a/single?client=gtx&sl=${source}&tl=${target}&dt=t&q=${encodeURIComponent(text)}`;

try{

const res = await fetch(url);

const data = await res.json();

document.getElementById("outputText").value =
data[0].map(item=>item[0]).join("");

}catch{

alert("Translation Failed");

}

}

document.getElementById("copyBtn")
.addEventListener("click",()=>{

navigator.clipboard.writeText(
document.getElementById("outputText").value
);

alert("Copied!");

});

document.getElementById("speakBtn")
.addEventListener("click",()=>{

const text =
document.getElementById("outputText").value;

const speech =
new SpeechSynthesisUtterance(text);

speech.lang =
targetLang.value;

speechSynthesis.speak(speech);

});

document.getElementById("swapBtn")
.addEventListener("click",()=>{

let temp = sourceLang.value;

sourceLang.value = targetLang.value;
targetLang.value = temp;

});