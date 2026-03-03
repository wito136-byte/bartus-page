document.addEventListener("DOMContentLoaded", () => {

const hero = document.querySelector(".protein-hero");
const title = document.querySelector(".protein-left h1");
const desc = document.querySelector(".protein-desc");
const barImg = document.querySelector(".protein-bar");
const buttons = document.querySelectorAll(".flavor-btn");

const flavors = {

coconut: {
title: "Coconut Dark",
desc: "Aromatyczny kokos przełamany intensywną nutą ciemnej czekolady. Lekko słodki, ale z wyraźnym, wytrawnym finiszem. Smak dopracowany tak, aby naturalnie maskować nuty białka, pozostawiając czyste, kremowe odczucie.",
image: "coconut.png",
gradient: "radial-gradient(circle at 70% 50%, rgba(120,200,255,0.45) 0%, rgba(200,235,255,0.35) 35%, #ffffff 65%)"
},

peanut: {
title: "Peanut Power",
desc: "Bogate, naturalne masło orzechowe o kremowej konsystencji, zbalansowane wysoką zawartością białka. Gęsty, sycący i konkretny — daje poczucie realnej energii, nie chwilowego impulsu. Klasyka w wersji sportowej, bez kompromisów.",
image: "peanut.png",
gradient: "radial-gradient(circle at 70% 50%, rgba(255,150,40,0.55) 0%, rgba(255,190,120,0.4) 35%, #ffffff 65%)"
},

dark: {
title: "Dark Salt",
desc: "Wytrawna, intensywna gorzka czekolada z subtelnym akcentem soli morskiej. Profil smakowy głęboki, czysty i zdecydowany — bez przesadnej słodyczy. To wariant dla tych, którzy nie szukają deseru, tylko dojrzałego smaku z charakterem.",
image: "dark.png",
gradient: "radial-gradient(circle at 70% 50%, rgba(200,40,40,0.55) 0%, rgba(255,100,100,0.35) 35%, #ffffff 65%)"
}

};

function smoothSwitch(flavorKey){

buttons.forEach(btn => btn.classList.remove("active"));
document.querySelector(`[data-flavor="${flavorKey}"]`).classList.add("active");

const newImage = new Image();
newImage.src = flavors[flavorKey].image;

barImg.classList.add("switching");
title.classList.add("switching");
desc.classList.add("switching");

hero.style.background = flavors[flavorKey].gradient;

newImage.onload = () => {

    setTimeout(() => {

        title.textContent = flavors[flavorKey].title;
        desc.textContent = flavors[flavorKey].desc;
        barImg.src = newImage.src;

        barImg.classList.remove("switching");
        title.classList.remove("switching");
        desc.classList.remove("switching");

    }, 150);

};
}

buttons.forEach(btn => {
btn.addEventListener("click", () => {
smoothSwitch(btn.dataset.flavor);
});
});

smoothSwitch("peanut");

// =====================
// PROTEIN POWER METER
// =====================

const weightRange = document.getElementById("weightRange");
const weightValue = document.getElementById("weightValue");
const proteinNeed = document.getElementById("proteinNeed");
const barNeed = document.getElementById("barNeed");

function updateProteinMeter(weight){

    weightValue.textContent = weight;

    const dailyProtein = weight * 2; // 2g/kg
    const bars = Math.ceil(dailyProtein / 42);

    proteinNeed.textContent = dailyProtein + " g";
    barNeed.textContent = bars + " szt.";
}

if(weightRange){
    updateProteinMeter(weightRange.value);

    weightRange.addEventListener("input", (e)=>{
        updateProteinMeter(e.target.value);
    });
}

});