document.addEventListener("DOMContentLoaded", () => {

/* =========================
   HERO + SMAKI
========================= */

const title = document.getElementById("flavor-title");
const desc = document.getElementById("flavor-desc");
const image = document.getElementById("canImage");
const glow = document.getElementById("glow");
const specs = document.querySelector(".energy-specs");
const ingredients = document.getElementById("ingredients-text");
const buttons = document.querySelectorAll(".flavor-btn");

const flavors = {

black: {
title: "Night Mode",
desc: "Intensywny, ciemny profil smakowy zaprojektowany do pracy po godzinach. Głębia, wytrawność i pełna kontrola. 300 mg kofeiny dla maksymalnego skupienia, kiedy liczy się każda minuta.",
image: "energole-black.png",
glow: "radial-gradient(circle, #3b82f6, transparent 70%)",
specs: "300 mg kofeiny • Zero cukru • 500 ml",
ingredients: "Woda gazowana, kwas (kwas cytrynowy), tauryna (0,4%), ekstrakt z guarany (0,2%), kofeina (0,06%), regulator kwasowości (cytrynian sodu), substancje słodzące (acesulfam K, sukraloza), aromaty naturalne, winian L-karnityny (0,015%), inozytol, amid kwasu nikotynowego (witamina B3), D-pantotenian wapnia (witamina B5), chlorowodorek pirydoksyny (witamina B6), cyjanokobalamina (witamina B12), barwnik: E150d."
},

red: {
title: "Crimson Rush",
desc: "Głęboka wiśnia z intensywnym granatem i wytrawnym akcentem hibiskusa. Smak zdecydowany, dojrzały, bez słodkiej przesady. 300 mg kofeiny dla pełnej dynamiki działania.",
image: "energole-red.png",
glow: "radial-gradient(circle, #dc2626, transparent 70%)",
specs: "300 mg kofeiny • Zero cukru • 500 ml",
ingredients: "Woda gazowana, kwas (kwas cytrynowy), tauryna (0,4%), ekstrakt z guarany (0,2%), kofeina (0,06%), regulator kwasowości (cytrynian sodu), substancje słodzące (acesulfam K, sukraloza), aromaty wiśniowo-granatowe, winian L-karnityny (0,015%), inozytol, witaminy B3, B5, B6, B12, barwniki: E163, E129."
},

violet: {
title: "Violet Voltage",
desc: "Skoncentrowane owoce leśne w mocnym, wyrazistym wydaniu. Jagoda i czarna porzeczka tworzą profil skupiony jak Twoje myśli. 300 mg kofeiny dla mentalnej precyzji.",
image: "energole-violet.png",
glow: "radial-gradient(circle, #7c3aed, transparent 70%)",
specs: "300 mg kofeiny • Zero cukru • 500 ml",
ingredients: "Woda gazowana, kwas (kwas cytrynowy), tauryna (0,4%), ekstrakt z guarany (0,2%), kofeina (0,06%), regulator kwasowości (cytrynian sodu), substancje słodzące (acesulfam K, sukraloza), aromaty jagodowo-porzeczkowe, winian L-karnityny (0,015%), inozytol, witaminy B3, B5, B6, B12, barwniki: E133, E122."
},

pink: {
title: "Pink Impact",
desc: "Soczysta malina z nutą różowego grejpfruta i świeżym finiszem mięty. Nowoczesny, orzeźwiający charakter. 300 mg kofeiny dla czystej, kontrolowanej mocy.",
image: "energole-pink.png",
glow: "radial-gradient(circle, #ec4899, transparent 70%)",
specs: "300 mg kofeiny • Zero cukru • 500 ml",
ingredients: "Woda gazowana, kwas (kwas cytrynowy), tauryna (0,4%), ekstrakt z guarany (0,2%), kofeina (0,06%), regulator kwasowości (cytrynian sodu), substancje słodzące (acesulfam K, sukraloza), aromaty malinowo-grejpfrutowe, winian L-karnityny (0,015%), inozytol, witaminy B3, B5, B6, B12, barwniki: E129, E120."
},

yellow: {
title: "Yellow Surge",
desc: "Dynamiczny cytrus z czystym, energetycznym finiszem. Świeży start i stabilne pobudzenie bez przeciążenia. 200 mg kofeiny dla równomiernej energii przez cały dzień.",
image: "energole-yellow.png",
glow: "radial-gradient(circle, #facc15, transparent 70%)",
specs: "200 mg kofeiny • Zero cukru • 500 ml",
ingredients: "Woda gazowana, kwas (kwas cytrynowy), tauryna (0,4%), kofeina (0,04%), regulator kwasowości (cytrynian sodu), substancje słodzące (acesulfam K, sukraloza), aromaty cytrusowe, witaminy B3, B5, B6, B12, barwnik: E102."
},

green: {
title: "Lime Reload",
desc: "Wyraźna limonka przełamana subtelną nutą zielonej herbaty. Orzeźwiający charakter i kontrolowana dawka energii. 200 mg kofeiny bez efektu nagłego spadku.",
image: "energole-green.png",
glow: "radial-gradient(circle, #22c55e, transparent 70%)",
specs: "200 mg kofeiny • Zero cukru • 500 ml",
ingredients: "Woda gazowana, kwas (kwas cytrynowy), tauryna (0,4%), kofeina (0,04%), regulator kwasowości (cytrynian sodu), substancje słodzące (acesulfam K, sukraloza), aromaty limonkowe, witaminy B3, B5, B6, B12, barwnik: E141."
}

};

function smoothSwitch(flavorKey){

buttons.forEach(btn => btn.classList.remove("active"));
document.querySelector(`[data-flavor="${flavorKey}"]`)?.classList.add("active");

image.classList.add("switching");
title.classList.add("switching");
desc.classList.add("switching");
specs.classList.add("switching");

setTimeout(() => {

title.textContent = flavors[flavorKey].title;
desc.textContent = flavors[flavorKey].desc;
specs.textContent = flavors[flavorKey].specs;
ingredients.textContent = flavors[flavorKey].ingredients;
image.src = flavors[flavorKey].image;
glow.style.background = flavors[flavorKey].glow;

image.classList.remove("switching");
title.classList.remove("switching");
desc.classList.remove("switching");
specs.classList.remove("switching");

}, 200);
}

buttons.forEach(btn => {
btn.addEventListener("click", () => {
smoothSwitch(btn.dataset.flavor);
});
});

smoothSwitch("black");


/* =========================
   TRYBY (BADGES)
========================= */

const overlay = document.getElementById("energyModeOverlay");
const modeCan = document.getElementById("modeCan");
const modeTitle = document.getElementById("modeTitle");
const modeSub = document.getElementById("modeSub");

function runMode(flavorKey, duration = 1500){

modeCan.src = flavors[flavorKey].image;
modeTitle.textContent = "TRYB: " + flavors[flavorKey].title.toUpperCase();
modeSub.textContent = flavors[flavorKey].specs;

overlay.classList.add("show");

setTimeout(()=>{
smoothSwitch(flavorKey);
overlay.classList.remove("show");
}, duration);
}

document.querySelectorAll(".badge").forEach(badge=>{
badge.addEventListener("click",()=>{

const text = badge.textContent.toLowerCase();

if(text.includes("nocna")) runMode("black");
if(text.includes("sesja")) runMode("yellow");
if(text.includes("trening")) runMode("green");

if(text.includes("projekt")){
overlay.classList.add("show");
modeTitle.textContent = "ENERGY STACK";
modeSub.textContent = "Ładowanie pełnej mocy...";
modeCan.src = flavors["black"].image;

setTimeout(()=>{ modeCan.src = flavors["yellow"].image; }, 400);
setTimeout(()=>{ modeCan.src = flavors["green"].image; }, 800);

setTimeout(()=>{
smoothSwitch("black");
overlay.classList.remove("show");
}, 1600);
}

});
});


/* =========================
   RANDOM SYSTEM (NAPRAWIONY)
========================= */

const randomBtn = document.getElementById("energyRandomBtn");
const randomOverlay = document.getElementById("energyRandomOverlay");
const randomTrack = document.getElementById("energyRandomTrack");
const randomResult = document.getElementById("energyRandomResult");
const randomWinnerImg = document.getElementById("randomWinnerImg");
const randomWinnerText = document.getElementById("randomWinnerText");
const randomConfirmBtn = document.getElementById("randomConfirmBtn");

let chosenFlavor = null;
const randomSequence = ["black","red","violet","pink","yellow","green"];

function startAppleRandom(){

randomOverlay.classList.add("active");
randomResult.classList.remove("show");

randomTrack.innerHTML = "";
randomTrack.style.transform = "translateX(0)";

chosenFlavor = randomSequence[Math.floor(Math.random() * randomSequence.length)];

for(let i=0;i<60;i++){
let flavor = randomSequence[i % randomSequence.length];
let img = document.createElement("img");
img.src = flavors[flavor].image;
randomTrack.appendChild(img);
}

let baseIndex = 30; // środek toru (bo mamy 60 puszek)
let winnerIndex = baseIndex + randomSequence.indexOf(chosenFlavor);

let canWidth = 500;
let finalPosition = -(winnerIndex * canWidth);

let duration = 3000; // 3 sekundy losowania
let startTime = null;

function animate(timestamp){

if(!startTime) startTime = timestamp;

let progress = (timestamp - startTime) / duration;

if(progress > 1) progress = 1;

// easing (ładne zwalnianie)
let ease = 1 - Math.pow(1 - progress, 3);

let currentPosition = finalPosition * ease;

randomTrack.style.transform = `translateX(${currentPosition}px)`;

if(progress < 1){
requestAnimationFrame(animate);
}else{
finishRandom();
}
}

requestAnimationFrame(animate);
}

function finishRandom(){

randomWinnerImg.src = flavors[chosenFlavor].image;
randomWinnerText.textContent =
"DZIŚ SYSTEM WYBRAŁ: " +
flavors[chosenFlavor].title.toUpperCase();

randomResult.classList.add("show");
}

if(randomBtn){
randomBtn.addEventListener("click", startAppleRandom);
}

if(randomConfirmBtn){
randomConfirmBtn.addEventListener("click", ()=>{

randomOverlay.classList.remove("active");
randomResult.classList.remove("show");

smoothSwitch(chosenFlavor);

window.scrollTo({
top:0,
behavior:"smooth"
});

});
}

});