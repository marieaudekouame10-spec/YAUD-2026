let guests = [];

// Chargement des invités
fetch("guests.json")
.then(response => response.json())
.then(data => {
    guests = data;
})
.catch(error => {
    console.log("Erreur chargement invités :", error);
});

// Entrer dans l'univers
function enterUniverse(){
    const hero = document.querySelector(".hero");
    const universe = document.getElementById("universe");

    // jouer une animation de disparition propre
    hero.classList.add("fade-out");

    // après la fin de l'animation on masque et affiche l'univers
    setTimeout(()=> {
        hero.style.display = "none";
        universe.classList.remove("hidden");
        // active le thème tropical (CSS cible #universe.universe)
        universe.classList.add("universe");
        // faire apparaître en douceur
        universe.classList.add("fade-in");
        window.scrollTo({ top:0, behavior:"smooth" });
    }, 380); // timing cohérent avec le CSS
}


// Navigation entre les rubriques
function showSection(id){
    document
    .querySelectorAll(".hidden-section")
    .forEach(section=>{
        section.style.display="none";
    });

    let section = document.getElementById(id);
    section.style.display="block";
    section.scrollIntoView({ behavior:"smooth" });
}

// Nettoyage des recherches
function normalize(text){
    return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g,"")
    .replace(/[’']/g," ")
    .replace(/-/g," ")
    .replace(/\s+/g," ")
    .trim();
}

// Recherche intelligente
function searchTable(){
    let input = document.getElementById("searchGuest").value;
    let resultBox = document.getElementById("result");

    if(input.length < 2){
        resultBox.innerHTML = `
        <p>Veuillez entrer votre nom.</p>
        `;
        return;
    }

    let search = normalize(input);
    let matches = guests.filter(person=>{
        let fullName = normalize(person.prenom + " " + person.nom);
        let reverseName = normalize(person.nom + " " + person.prenom);
        return (
            fullName.includes(search) ||
            reverseName.includes(search) ||
            normalize(person.prenom).includes(search) ||
            normalize(person.nom).includes(search)
        );
    });

    if(matches.length === 0){
        resultBox.innerHTML = `
        <p>Aucun invité trouvé.<br>Vérifiez l'orthographe.</p>
        `;
        return;
    }

    // Plusieurs personnes trouvées
    if(matches.length > 1){
        resultBox.innerHTML = `
        <p>Plusieurs invités correspondent. Veuillez sélectionner votre nom :</p>
        ${matches.map((person,index)=>`
            <button class="choice" onclick="showGuest(${index})">${person.prenom} ${person.nom}</button>
        `).join("")}
        `;
        window.currentMatches = matches;
        return;
    }

    showGuestResult(matches[0]);
}

// Afficher après sélection
function showGuest(index){
    let person = window.currentMatches[index];
    showGuestResult(person);
}

function showGuestResult(person){
    document.getElementById("result").innerHTML = `
    <div class="guest-result">
        <h3>Bonjour ${person.prenom} ✨</h3>
        <p>Nous sommes heureux de vous accueillir pour cette belle journée.</p>
        <h2>🌿 ${person.table}</h2>
    </div>
    `;
}
