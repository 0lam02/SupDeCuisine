const recettesContainer = document.getElementById("recettes-container");
const ingredientFilter = document.getElementById("ingredient-filter");
const applianceFilter = document.getElementById("appliance-filter");
const ustensilFilter = document.getElementById("ustensil-filter");
let recettesData = [];

exports = { afficherRecettes, filtrerRecettes, mettreAJourCompteur };

// Charger les données JSON
fetch("recipes.json")
    .then(response => response.json())
    .then(data => {
        recettesData = data;
        afficherRecettes(data);
        remplirSuggestions(); // Remplir les suggestions pour l'autocomplétion
    })
    .catch(error => console.error("Erreur:", error));

// Fonction pour afficher les recettes en fonction des filtres
function afficherRecettes(recettes) {
    recettesContainer.innerHTML = ""; // Vider le conteneur
    if (recettes.length === 0) {
        // Afficher un message s'il n'y a pas de résultats
        recettesContainer.innerHTML = `<p>Aucune recette ne correspond à votre recherche.</p>`;
    } else {
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
    }
}

// Fonction pour mettre à jour le compteur de recettes affichées
function mettreAJourCompteur(recettes) {
    const compteur = document.getElementById("recettes-compteur");
    compteur.textContent = `${recettes.length} recette(s) trouvée(s)`;
}

// Fonction pour remplir les suggestions d'autocomplétion
function remplirSuggestions() {
    const allIngredients = new Set();
    const allAppliances = new Set();
    const allUstensils = new Set();

    recettesData.forEach(recette => {
        recette.ingredients.forEach(ing => allIngredients.add(ing.ingredient));
        allAppliances.add(recette.appliance);
        recette.ustensils.forEach(ustensil => allUstensils.add(ustensil));
    });

    // Ajouter les écouteurs d'événements pour les filtres avancés
    ingredientFilter.addEventListener("input", filtrerRecettes);
    applianceFilter.addEventListener("input", filtrerRecettes);
    ustensilFilter.addEventListener("input", filtrerRecettes);
}

// Fonction de filtrage des recettes combinant le filtre général et les filtres avancés
function filtrerRecettes() {
    // Obtenir les valeurs des filtres
    const searchValue = document.getElementById("myInput").value.toLowerCase();
    const ingredientValue = ingredientFilter.value.toLowerCase();
    const applianceValue = applianceFilter.value.toLowerCase();
    const ustensilValue = ustensilFilter.value.toLowerCase();

    // Appliquer d'abord le filtre général (recherche dans le nom, ingrédients ou ustensiles)
    let recettesFiltrees = recettesData.filter(recette => {
        return (
            searchValue === "" ||
            recette.name.toLowerCase().includes(searchValue) ||
            recette.ingredients.some(ing => ing.ingredient.toLowerCase().includes(searchValue)) ||
            recette.ustensils.some(ustensil => ustensil.toLowerCase().includes(searchValue))
        );
    });

    // Appliquer les filtres avancés sur les résultats du filtre général
    recettesFiltrees = recettesFiltrees.filter(recette => {
        const matchesIngredient = ingredientValue === "" || recette.ingredients.some(ing => ing.ingredient.toLowerCase().includes(ingredientValue));
        const matchesAppliance = applianceValue === "" || recette.appliance.toLowerCase().includes(applianceValue);
        const matchesUstensil = ustensilValue === "" || recette.ustensils.some(ustensil => ustensil.toLowerCase().includes(ustensilValue));

        // La recette doit correspondre à tous les filtres actifs
        return matchesIngredient && matchesAppliance && matchesUstensil;
    });

    // Afficher les recettes filtrées et mettre à jour le compteur
    afficherRecettes(recettesFiltrees);
    mettreAJourCompteur(recettesFiltrees);
}

// Ajouter un écouteur d'événement pour le champ de recherche général dans le header
document.getElementById("myInput").addEventListener("input", filtrerRecettes);


