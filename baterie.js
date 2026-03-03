document.addEventListener("DOMContentLoaded", () => {

const hero = document.querySelector(".battery-hero");
const title = document.getElementById("battery-title");
const desc = document.getElementById("battery-desc");
const img = document.getElementById("batteryImage");
const buttons = document.querySelectorAll(".battery-btn");
const spec = document.querySelector(".battery-spec");
const tech = document.getElementById("batteryTech");
const use = document.getElementById("batteryUse");

const types = {

basic:{
title:"Bartuś Basic",
desc:"Stabilne źródło energii do urządzeń o niskim i średnim poborze mocy.",
spec:"LEVEL 1 / ZINC POWER",
tech:"Ogniwa cynkowe zaprojektowane do urządzeń o niskim i umiarkowanym poborze mocy. Zapewniają stabilne napięcie przy sporadycznym użytkowaniu oraz ekonomiczne rozwiązanie tam, gdzie wysoka wydajność nie jest wymagana.",
use:"Piloty TV, zegary ścienne, lampki LED, proste zabawki i inne urządzenia używane okazjonalnie.",
image:"bat1.png",
gradient:"radial-gradient(circle at 75% 50%, rgba(0,120,255,0.55) 0%, #f5f5f7 65%)"
},

home:{
title:"Bartuś Home Premium",
desc:"Wydajne baterie alkaliczne do codziennych urządzeń domowych.",
spec:"LEVEL 2 / ALKALINE POWER",
tech:"Baterie alkaliczne o zwiększonej wydajności i dłuższej żywotności w porównaniu do technologii cynkowej. Stabilne napięcie przy regularnym użytkowaniu i większym obciążeniu.",
use:"Pady do konsol, myszki komputerowe, aparaty cyfrowe, szczoteczki elektryczne, zabawki interaktywne, sprzęt domowy używany codziennie.",
image:"bat2.png",
gradient:"radial-gradient(circle at 75% 50%, rgba(255,200,0,0.6) 0%, #f5f5f7 65%)"
},

industrial:{
title:"Bartuś Industrial Ultimate",
desc:"Litowa technologia o maksymalnej gęstości energii.",
spec:"LEVEL 3 / LITHIUM POWER",
tech:"Ogniwa litowe o wysokiej gęstości energii i odporności na skrajne temperatury. Zapewniają maksymalny czas pracy oraz stabilne parametry nawet przy dużym obciążeniu.",
use:"Sprzęt profesjonalny, urządzenia pomiarowe, czujniki alarmowe, monitoring, sprzęt outdoorowy oraz urządzenia pracujące w trudnych warunkach.",
image:"bat3.png",
gradient:"radial-gradient(circle at 75% 50%, rgba(255,0,0,0.55) 0%, #f5f5f7 65%)"
}

};

function smoothSwitch(type){

buttons.forEach(btn => btn.classList.remove("active"));
document.querySelector(`[data-type="${type}"]`).classList.add("active");

img.classList.add("switching");
title.classList.add("switching");
desc.classList.add("switching");

hero.style.background = types[type].gradient;

const newImage = new Image();
newImage.src = types[type].image;

newImage.onload = () => {

setTimeout(()=>{

spec.textContent = types[type].spec;
tech.textContent = types[type].tech;
use.textContent = types[type].use;
title.textContent = types[type].title;
desc.textContent = types[type].desc;
img.src = newImage.src;

img.classList.remove("switching");
title.classList.remove("switching");
desc.classList.remove("switching");

},150);

};

}

buttons.forEach(btn=>{
btn.addEventListener("click",()=>{
smoothSwitch(btn.dataset.type);
});
});

smoothSwitch("home");

const levelCards = document.querySelectorAll(".level-card");

levelCards.forEach(card=>{
    card.addEventListener("click",()=>{
        const type = card.dataset.type;
        smoothSwitch(type);
        window.scrollTo({ top:0, behavior:"smooth" });
    });
});


const cards = document.querySelectorAll(".device-card");
const message = document.getElementById("selectorMessage");

cards.forEach(card=>{
  card.addEventListener("click",()=>{

    const type = card.dataset.type;

    // reset
    cards.forEach(c=>{
      c.classList.remove("active","blue-glow","yellow-glow","red-glow","dim");
    });

    // dim others
    cards.forEach(c=>{
      if(c!==card) c.classList.add("dim");
    });

    // activate selected
    card.classList.add("active");

    if(type==="basic") card.classList.add("blue-glow");
    if(type==="home") card.classList.add("yellow-glow");
    if(type==="industrial") card.classList.add("red-glow");

    // stage 1
    message.textContent="Analizujemy urządzenie...";
    message.classList.add("show");

    // stage 2
    setTimeout(()=>{
      if(type==="basic")
        message.textContent="Rekomendujemy LEVEL 1 — Zinc Basic";
      if(type==="home")
        message.textContent="Rekomendujemy LEVEL 2 — Home Premium";
      if(type==="industrial")
        message.textContent="Rekomendujemy LEVEL 3 — Industrial Ultimate";
    },1100);

    // stage 3
    setTimeout(()=>{
      smoothSwitch(type);
      window.scrollTo({top:0,behavior:"smooth"});

      cards.forEach(c=>{
        c.classList.remove("active","blue-glow","yellow-glow","red-glow","dim");
      });

      message.classList.remove("show");
    },1800);

  });
});


const modal = document.getElementById("recommendationModal");
const modalBox = document.querySelector(".recommendation-box");
const modalLevel = document.getElementById("modalLevel");

cards.forEach(card=>{
  card.addEventListener("click",()=>{

    const type = card.dataset.type;

    setTimeout(()=>{

      modalBox.classList.remove("modal-basic","modal-home","modal-industrial");

      if(type==="basic"){
        modalLevel.textContent="BASIC";
        modalBox.classList.add("modal-basic");
      }

      if(type==="home"){
        modalLevel.textContent="HOME PREMIUM";
        modalBox.classList.add("modal-home");
      }

      if(type==="industrial"){
        modalLevel.textContent="INDUSTRIAL";
        modalBox.classList.add("modal-industrial");
      }

      modal.classList.add("show");

    },900);

    setTimeout(()=>{
      modal.classList.remove("show");
      smoothSwitch(type);
      window.scrollTo({top:0,behavior:"smooth"});
    },2200);

  });
});

});