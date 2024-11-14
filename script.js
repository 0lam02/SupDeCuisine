const recettesContainer = document.getElementById("recettes-container");
const ingredientFilter = document.getElementById("ingredient-filter");
const applianceFilter = document.getElementById("appliance-filter");
const ustensilFilter = document.getElementById("ustensil-filter");
const searchInput = document.getElementById("myInput");  // Champ de recherche global
let recettesData = [];

// Charger les données JSON
fetch("recipes.json")  // Utilisation du nouveau nom du fichier JSON
    .then(response => response.json())
    .then(data => {
        recettesData = data;
        afficherRecettes(data);
        remplirSuggestions(); // Remplir les suggestions pour l'autocomplétion
    })
    .catch(error => console.error("Erreur:", error));

// Ajouter un écouteur pour l'input de recherche
searchInput.addEventListener("keyup", function() {
    const searchValue = searchInput.value.toLowerCase();
    filtrerRecettes(searchValue);
});

// Fonction pour afficher les recettes
function afficherRecettes(recettes) {
    recettesContainer.innerHTML = ""; // Vider le conteneur
    recettes.forEach(recette => {
        const card = document.createElement("div");
        card.classList.add("recette-card");

        const img = document.createElement("img");
        img.src = `images/JSON recipes/${recette.image}`;
        img.alt = recette.name;

        const title = document.createElement("h2");
        title.textContent = recette.name;

        const ingredientsTitle = document.createElement("h3");
        ingredientsTitle.textContent = "Ingrédients";
        const ingredientsList = document.createElement("ul");
        recette.ingredients.forEach(ingredient => {
            const ingredientItem = document.createElement("li");
            const quantity = ingredient.quantity ? `${ingredient.quantity} ` : "";
            const unit = ingredient.unit ? `${ingredient.unit} ` : "";
            ingredientItem.textContent = `${quantity}${unit}${ingredient.ingredient}`;
            ingredientsList.appendChild(ingredientItem);
        });

        const appliance = document.createElement("p");
        appliance.classList.add("details");
        appliance.innerHTML = `<strong>Appareil :</strong> ${recette.appliance}`;

        const ustensils = document.createElement("p");
        ustensils.classList.add("details");
        ustensils.innerHTML = `<strong>Ustensiles :</strong> ${recette.ustensils.join(", ")}`;

        card.appendChild(img);
        card.appendChild(title);
        card.appendChild(ingredientsTitle);
        card.appendChild(ingredientsList);
        card.appendChild(appliance);
        card.appendChild(ustensils);

        recettesContainer.appendChild(card);
    });

    mettreAJourCompteur(recettes);  // Mettre à jour le compteur
}

// Fonction pour mettre à jour le compteur
function mettreAJourCompteur(recettesFiltrees) {
    const recipeCountElement = document.getElementById("recipe-count");
    recipeCountElement.textContent = `${recettesFiltrees.length} recette${recettesFiltrees.length > 1 ? 's' : ''}`;
}

// Fonction pour filtrer les recettes en fonction de la recherche
function filtrerRecettes(searchValue) {
    const recettesFiltrees = recettesData.filter(recette => {
        const hasName = recette.name.toLowerCase().includes(searchValue);
        const hasIngredient = recette.ingredients.some(ing => ing.ingredient.toLowerCase().includes(searchValue));
        const hasUstensil = recette.ustensils.some(ustensil => ustensil.toLowerCase().includes(searchValue));

        return hasName || hasIngredient || hasUstensil;
    });

    afficherRecettes(recettesFiltrees);
    mettreAJourCompteur(recettesFiltrees);
}
