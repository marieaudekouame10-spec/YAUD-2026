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

    document.getElementById("universe")
    .classList.remove("hidden");

    window.scrollTo({

        top:0,
        behavior:"smooth"

    });

}





// Afficher une rubrique

function showSection(id){


    let sections = document.querySelectorAll(".hidden-section");


    sections.forEach(section=>{

        section.style.display="none";

    });



    let selected = document.getElementById(id);


    selected.style.display="block";


    selected.scrollIntoView({

        behavior:"smooth"

    });


}






// Nettoyage recherche

function normalize(text){


    return text

    .toLowerCase()

    .normalize("NFD")

    .replace(/[\u0300-\u036f]/g,"")

    .replace(/[-]/g," ")

    .replace(/\s+/g," ")

    .trim();


}





// Recherche invité

function searchTable(){


    let input =
    document
    .getElementById("searchGuest")
    .value;



    if(input.length < 2){

        document.getElementById("result").innerHTML =
        `
        <p>
        Veuillez entrer votre nom.
        </p>
        `;

        return;

    }



    let search =
    normalize(input);



    let result =
    guests.find(person=>{


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






    if(result){


        document
        .getElementById("result")
        .innerHTML =


        `

        <div class="guest-result">

        <h3>
        Bonjour ${result.prenom} ✨
        </h3>


        <p>
        Nous sommes heureux de vous accueillir
        pour cette belle journée.
        </p>


        <strong>
        🌿 Votre table :
        </strong>


        <h2>
        ${result.table}
        </h2>


        </div>

        `;


    }

    else{


        document
        .getElementById("result")
        .innerHTML =


        `

        <p>
        Aucun invité trouvé.
        Vérifiez l'orthographe de votre nom.
        </p>

        `;


    }



}
