document.addEventListener("DOMContentLoaded", () => {

/* =========================
   FLAVOR SWITCH
========================= */

const hero = document.querySelector(".muse-hero");
const title = document.querySelector(".muse-left h1");
const desc = document.querySelector(".muse-desc");
const image = document.querySelector(".muse-pack");
const ingredients = document.getElementById("ingredients-text");
const buttons = document.querySelectorAll(".flavor-btn");

const flavors = {

mix1:{
title:"Jabłko Banan Marchew",
desc:"Naturalnie słodkie połączenie owoców i warzyw. Idealne dla najmłodszych.",
image:"mus1.png",
ingredients:"Przecier jabłkowy, bananowy, marchewkowy, witamina D.",
gradient:"radial-gradient(circle at 70% 50%, rgba(255,200,120,0.4) 0%, #ffffff 65%)"
},

mix2:{
title:"Truskawka Jabłko",
desc:"Owocowa świeżość truskawki połączona z delikatnym jabłkiem.",
image:"mus2.png",
ingredients:"Przecier jabłkowy, truskawkowy, witamina D.",
gradient:"radial-gradient(circle at 70% 50%, rgba(255,120,160,0.4) 0%, #ffffff 65%)"
},

mix3:{
title:"Jabłko Kiwi",
desc:"Lekko kwaśne kiwi przełamane naturalną słodyczą jabłka.",
image:"mus3.png",
ingredients:"Przecier jabłkowy, kiwi, witamina D.",
gradient:"radial-gradient(circle at 70% 50%, rgba(120,255,150,0.4) 0%, #ffffff 65%)"
}

};

function smoothSwitch(key){

buttons.forEach(btn=>btn.classList.remove("active"));
document.querySelector(`[data-flavor="${key}"]`).classList.add("active");

image.classList.add("switching");
title.classList.add("switching");
desc.classList.add("switching");

hero.style.background = flavors[key].gradient;

setTimeout(()=>{

title.textContent = flavors[key].title;
desc.textContent = flavors[key].desc;
ingredients.textContent = flavors[key].ingredients;
image.src = flavors[key].image;

image.classList.remove("switching");
title.classList.remove("switching");
desc.classList.remove("switching");

},150);

}

buttons.forEach(btn=>{
btn.addEventListener("click",()=>{
smoothSwitch(btn.dataset.flavor);
});
});

smoothSwitch("mix1");


/* =========================
   MODAL
========================= */

const modal = document.getElementById("interactiveModal");
const modalContent = document.getElementById("modalContent");
const openQuiz = document.getElementById("openQuiz");
const openMemory = document.getElementById("openMemory");
const closeModal = document.getElementById("closeModal");

openQuiz.addEventListener("click",()=>{
modal.classList.add("show");
loadQuiz();
});

openMemory.addEventListener("click",()=>{
modal.classList.add("show");
loadMemory();
});

closeModal.addEventListener("click",()=>{
modal.classList.remove("show");
modalContent.innerHTML="";
});


/* =========================
   MEMORY GAME
========================= */

function loadMemory(){

const fruits=["🍓","🍌","🥝","🥕","🍎","🍏"];
let cards=[...fruits,...fruits].sort(()=>0.5-Math.random());

modalContent.innerHTML=`
<h2>Dopasuj składniki</h2>
<div class="memory-grid"></div>
`;

const grid=document.querySelector(".memory-grid");

cards.forEach(icon=>{

const card=document.createElement("div");
card.classList.add("memory-card");

card.innerHTML=`
<div class="memory-inner">
<div class="memory-front">?</div>
<div class="memory-back">${icon}</div>
</div>
`;

card.dataset.icon=icon;
grid.appendChild(card);

});

let first=null;
let matched=0;

document.querySelectorAll(".memory-card").forEach(card=>{

card.addEventListener("click",()=>{

if(card.classList.contains("flipped")) return;

card.classList.add("flipped");

if(!first){
first=card;
}else{

if(first.dataset.icon===card.dataset.icon){
matched+=2;
first=null;

if(matched===cards.length){
setTimeout(()=>{
grid.innerHTML+=`
<div class="memory-win">
🎉 Brawo! Ukończyłeś grę!
</div>`;
},400);
}

}else{
setTimeout(()=>{
card.classList.remove("flipped");
first.classList.remove("flipped");
first=null;
},700);
}

}

});

});

}


/* =========================
   QUIZ 6 PYTAŃ
========================= */

function loadQuiz(){

const questions=[

{q:"Czy napój owocowy zawsze zawiera 100% owoców?",answers:["Tak","Nie"],correct:1},
{q:"Czy mus owocowy może zawierać dodany cukier?",answers:["Tak","Nie"],correct:0},
{q:"Czy naturalnie występujące cukry to to samo co cukier dodany?",answers:["Tak","Nie"],correct:1},
{q:"Który produkt ma najprostszy skład?",answers:["Napój owocowy","Bartuśki","Jogurt smakowy"],correct:1},
{q:"Czy witamina D jest ważna dla dzieci?",answers:["Tak","Nie"],correct:0},
{q:"Czy 100% owoców oznacza brak konserwantów?",answers:["Tak","Nie zawsze"],correct:1}

];

let current=0;
let score=0;

modalContent.innerHTML=`
<div class="quiz-container">
<h2 id="quizQuestion"></h2>
<div id="quizAnswers"></div>
</div>
`;

function showQuestion(){

const q=questions[current];
document.getElementById("quizQuestion").textContent=q.q;

const answersDiv=document.getElementById("quizAnswers");
answersDiv.innerHTML="";

q.answers.forEach((a,i)=>{

const btn=document.createElement("button");
btn.className="quiz-option";
btn.textContent=a;

btn.addEventListener("click",()=>{

if(i===q.correct) score++;

current++;

if(current<questions.length){
showQuestion();
}else{
showResult();
}

});

answersDiv.appendChild(btn);

});

}

function showResult(){

let grade=Math.max(1,Math.round((score/questions.length)*6));

modalContent.innerHTML=`
<div class="quiz-result">
<h2>Twój wynik: ${score}/6</h2>
<h1>Ocena: ${grade}</h1>
<p>
${grade>=5?"Świetnie! Wiesz, co wybierać dla dziecka.":
grade>=3?"Całkiem dobrze, ale warto czytać składy.":
"Warto zwracać większą uwagę na etykiety."}
</p>
</div>
`;

}

showQuestion();

}

});