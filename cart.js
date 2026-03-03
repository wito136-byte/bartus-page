let poprzedniaOszczednosc = 0;
let rzeczy = [

["📱","iPhone 17",4500],
["🎮","PlayStation 5",2500],
["🎧","AirPods 4",550],
["💻","MacBook",3700],
["👟","Sneakersy",800],
["✈️","City Break",1500]
];

function updateSlider(val){
document.getElementById("sliderValue").innerText = val;
policz();
}

function animateValue(id,start,end,duration){

let startTime=null;

function animation(currentTime){

if(!startTime) startTime=currentTime;

let progress=currentTime-startTime;
let percent=Math.min(progress/duration,1);

let value=Math.floor(percent*(end-start)+start);

document.getElementById(id).innerText=
"Oszczędzasz: "+value.toLocaleString()+" zł";

if(progress<duration){
requestAnimationFrame(animation);
}

}

requestAnimationFrame(animation);

}
function policz(){

let razy=document.getElementById("razy").value;
let kosztJednego=24.99/12;

let mies=razy*kosztJednego;
let rocznie=mies*12;
let lat18=rocznie*18;

let dziecko=380000;

if(document.getElementById("plus").checked){
dziecko-=800*12*18;
document.getElementById("dzieckoLabel").innerText=
"Szacowany koszt dziecka po uwzględnieniu 800+:";
}else{
dziecko=380000;
document.getElementById("dzieckoLabel").innerText=
"Szacowany koszt dziecka do ukończenia 18 roku życia:";
}

let oszczednosc=Math.floor(dziecko-lat18);

animateValue("oszczedzasz",0,oszczednosc,200);

let wyplata=document.getElementById("wyplata").value;

if(wyplata>0){
let miesPracy=oszczednosc/wyplata;
let lata=miesPracy/12;

document.getElementById("praca").innerText=
"To ok. "+miesPracy.toFixed(0)+
" miesięcy pracy ("+lata.toFixed(1)+" lat)";
}

wyswietlKarty(oszczednosc);

}

function wyswietlKarty(kwota){

let lista=document.getElementById("rzeczyLista");
lista.innerHTML="";

for(let i=0;i<rzeczy.length;i++){

let icon=rzeczy[i][0];
let nazwa=rzeczy[i][1];
let cena=rzeczy[i][2];

let ile=Math.floor(kwota/cena);

let card=document.createElement("div");
card.className="card";

card.innerHTML=
"<div class='card-icon'>"+icon+"</div>"+
"<div class='card-title'>"+nazwa+"</div>"+
"<div class='card-amount'>"+ile+" szt.</div>"+
"<div class='card-tooltip'>Cena: "+cena.toLocaleString()+" zł<br><small>22.02.2026</small></div>";

lista.appendChild(card);

}

}

function animateValue(id,start,end,duration){

let startTime=null;

function animation(currentTime){

if(!startTime) startTime=currentTime;

let progress=currentTime-startTime;
let percent=Math.min(progress/duration,1);

let value=Math.floor(percent*(end-start)+start);

document.getElementById(id).innerText=
"Oszczędzasz: "+value.toLocaleString()+" zł";

if(progress<duration){
requestAnimationFrame(animation);
}

}

requestAnimationFrame(animation);

}

function policz(){

let razy=document.getElementById("razy").value;

let kosztJednego=24.99/12;

let mies=razy*kosztJednego;
let rocznie=mies*12;
let lat18=rocznie*18;

let dziecko=380000;

if(document.getElementById("plus").checked){
dziecko-=800*12*18;
document.getElementById("dzieckoLabel").innerText=
"Szacowany koszt dziecka po uwzględnieniu 800+:";
}else{
dziecko=380000;
document.getElementById("dzieckoLabel").innerText=
"Szacowany koszt dziecka do ukończenia 18 roku życia:";
}

let oszczednosc=Math.floor(dziecko-lat18);

/* ===== NAPRAWA "Jak to liczymy?" ===== */

document.getElementById("miesiecznyKoszt").innerText =
"Koszt miesięczny: " + mies.toFixed(2) + " zł";

document.getElementById("rocznyKoszt").innerText =
"Koszt roczny: " + rocznie.toFixed(2) + " zł";

document.getElementById("lat18Koszt").innerText =
"Koszt przez 18 lat: " + lat18.toFixed(2) + " zł";

document.getElementById("dzieckoKoszt").innerText =
dziecko.toLocaleString() + " zł";

/* ===== ANIMACJA OSZCZĘDNOŚCI (MAX 2s) ===== */

animateValue("oszczedzasz",poprzedniaOszczednosc,oszczednosc,500);
poprzedniaOszczednosc = oszczednosc;

/* ===== PRZELICZENIE NA PRACĘ ===== */

let wyplata=document.getElementById("wyplata").value;

if(wyplata>0){
let miesPracy=oszczednosc/wyplata;
let lata=miesPracy/12;

document.getElementById("praca").innerText=
"To ok. "+miesPracy.toFixed(0)+
" miesięcy pracy ("+lata.toFixed(1)+" lat)";
}

/* ===== KARTY ===== */

wyswietlKarty(oszczednosc);

}