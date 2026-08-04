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

    document.querySelector(".hero").style.display="none";

    document
    .getElementById("universe")
    .classList.remove("hidden");


    window.scrollTo({

        top:0,
        behavior:"smooth"

    });

}






// Navigation entre les rubriques

function showSection(id){


    document
    .querySelectorAll(".hidden-section")
    .forEach(section=>{

        section.style.display="none";

    });



    let section =
    document.getElementById(id);


    section.style.display="block";


    section.scrollIntoView({

        behavior:"smooth"

    });


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


let input =
document
.getElementById("searchGuest")
.value;



let resultBox =
document.getElementById("result");



if(input.length < 2){


resultBox.innerHTML =

`
<p>
Veuillez entrer votre nom.
</p>
`;

return;

}




let search =
normalize(input);





let matches =
guests.filter(person=>{


let fullName =
normalize(
person.prenom + " " + person.nom
);



let reverseName =
normalize(
person.nom + " " + person.prenom
);



return (

fullName.includes(search)

||

reverseName.includes(search)

||

normalize(person.prenom)
.includes(search)

||

normalize(person.nom)
.includes(search)

);


});








if(matches.length === 0){


resultBox.innerHTML =

`

<p>
Aucun invité trouvé.<br>
Vérifiez l'orthographe.
</p>

`;

return;


}








// Plusieurs personnes trouvées

if(matches.length > 1){



resultBox.innerHTML =


`

<p>
Plusieurs invités correspondent.
Veuillez sélectionner votre nom :
</p>


${matches.map((person,index)=>`


<button 
class="choice"
onclick="showGuest(${index})">

${person.prenom} ${person.nom}

</button>


`).join("")}

`;



window.currentMatches = matches;


return;


}






showGuestResult(matches[0]);



}









// Afficher après sélection

function showGuest(index){


let person =
window.currentMatches[index];


showGuestResult(person);


}







function showGuestResult(person){



document
.getElementById("result")
.innerHTML =


`

<div class="guest-result">


<h3>
Bonjour ${person.prenom} ✨
</h3>


<p>
Nous sommes heureux de vous accueillir
pour cette belle journée.
</p>



<h2>
🌿 ${person.table}
</h2>


</div>


`;



}
