// Aan te passen code
const speler_naam = 'Jouw naam'; // Pas dit aan naar je eigen naam
let speler_levens = 5; // Pas dit getal aan hoeveel levens de speler heeft
let computer_levens = 5; // Pas dit getal aan hoeveel levens de computer heeft
const keuzes = ['blad', 'steen', 'schaar'];
const afbeeldingen = [
  "https://i.pinimg.com/originals/9b/e3/a3/9be3a36686a96e6fff94cd063d55c02d.png", // Blad
  "https://i.pinimg.com/originals/9d/bb/14/9dbb14a92a7611794f3e5a0c80e4bad6.png", // Steen
  "https://freepngimg.com/thumb/scissors/1-blue-scissors-png-image-download.png" // Schaar
];

// Niet aan te passen code
// Volgende lijn vult je naam in in de HTML
document.getElementById('speler_naam').innerHTML = speler_naam;
// Volgende lijnen spreken de elementen in HTML aan
const speler_keuze = document.getElementById('speler_keuze');
const computer_keuze = document.getElementById('computer_keuze');
const speler_levens_element = document.getElementById('speler_levens');
const computer_levens_element = document.getElementById('computer_levens');
const keuze_blad = document.getElementById('keuze_blad');
const keuze_steen = document.getElementById('keuze_steen');
const keuze_schaar = document.getElementById('keuze_schaar');
const reset_knop = document.getElementById('reset_knop');
const speler_wint = document.getElementById('speler_wint');
const computer_wint = document.getElementById('computer_wint');
const speler_levens_voor_reset = speler_levens;
const computer_levens_voor_reset = computer_levens;

// Volgende functie toont de levens in de HTML
function toon_levens(aantal_levens) {
  let output = '';
  for (let i = 1; i <= aantal_levens; i++) {
    output += `<div class="leven"></div>`;
  }
  return output;
}

speler_levens_element.innerHTML = toon_levens(speler_levens);
computer_levens_element.innerHTML = toon_levens(computer_levens);

// Volgende functie zorgt ervoor dat de knoppen aanspreekbaar zijn
function vooruitgang(speler) {
  let speler_wapen = keuzes[speler];
  let computer_random_keuze = Math.floor(Math.random() * keuzes.length);
  let computer_wapen = keuzes[computer_random_keuze];
  speler_keuze.innerHTML = `<img src="${afbeeldingen[speler]}" alt="${afbeeldingen[speler]}" class="keuze__afbeelding"/>`;
  computer_keuze.innerHTML = `<img src="${afbeeldingen[computer_random_keuze]}" alt="${afbeeldingen[computer_random_keuze]}" class="keuze__afbeelding"/>`;
  blad_steen_schaar(speler_wapen, computer_wapen);
  speler_levens_element.innerHTML = toon_levens(speler_levens);
  computer_levens_element.innerHTML = toon_levens(computer_levens);
  einde_spel(speler_levens, computer_levens);
}

keuze_blad.addEventListener('click', () => vooruitgang(0));
keuze_steen.addEventListener('click', () => vooruitgang(1));
keuze_schaar.addEventListener('click', () => vooruitgang(2));

// Volgende functie zal aangeven wat van wat wint
function blad_steen_schaar(speler_wapen, computer_wapen) {
  if (speler_wapen === computer_wapen) {
    return;
  } else if (speler_wapen === 'blad' && computer_wapen === 'steen') {
    computer_levens = computer_levens - 1;
  } else if (speler_wapen === 'steen' && computer_wapen === 'schaar') {
    computer_levens = computer_levens - 1;
  } else if (speler_wapen === 'schaar' && computer_wapen === 'blad') {
    computer_levens = computer_levens - 1;
  } else {
    speler_levens = speler_levens - 1;
  }
}

// Volgende functie kijkt hoeveel levens iedere speler nog heeft en zal een winnaar aanduiden
function einde_spel(check_speler_leven, check_computer_leven) {
  if (check_speler_leven === 0) {
    verberg_keuzes();
    computer_wint.classList.remove('hidden');
  } else if (check_computer_leven === 0) {
    verberg_keuzes();
    speler_wint.classList.remove('hidden');
  } else {
    return;
  }
}

// Deze functie zal de knoppen verbergen
function verberg_keuzes() {
	keuze_blad.classList.add('hidden');
  keuze_steen.classList.add('hidden');
  keuze_schaar.classList.add('hidden');
}

// Volgende code maakt dat de resetknop werkt
function reset_het_spel() {
  speler_levens = speler_levens_voor_reset;
  computer_levens = computer_levens_voor_reset;
  speler_keuze.innerHTML = null;
  computer_keuze.innerHTML = null;
  speler_levens_element.innerHTML = toon_levens(speler_levens);
  computer_levens_element.innerHTML = toon_levens(computer_levens);
  speler_wint.classList.add('hidden');
  computer_wint.classList.add('hidden');
  keuze_blad.classList.remove('hidden');
  keuze_steen.classList.remove('hidden');
  keuze_schaar.classList.remove('hidden');
}

reset_knop.addEventListener("click", reset_het_spel);