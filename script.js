const recettesContainer = document.getElementById("recettes-container");
const ingredientFilter = document.getElementById("ingredient-filter");
const applianceFilter = document.getElementById("appliance-filter");
const ustensilFilter = document.getElementById("ustensil-filter");
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

// Fonction pour afficher les recettes en fonction des filtres
function afficherRecettes(recettes) {
    recettesContainer.innerHTML = ""; // Vider le conteneur
    recettes.forEach(recette => {
        const card = document.createElement("div");
        card.classList.add("recette-card");

        // Chemin de l'image avec le dossier correct
        const img = document.createElement("img");
        img.src = `images/JSON recipes/${recette.image}`;  // Chemin mis à jour
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

    ingredientFilter.addEventListener("input", () => filtrerRecettes());
    applianceFilter.addEventListener("input", () => filtrerRecettes());
    ustensilFilter.addEventListener("input", () => filtrerRecettes());
}

// Fonction de filtrage des recettes
function filtrerRecettes() {
    const ingredientValue = ingredientFilter.value.toLowerCase();
    const applianceValue = applianceFilter.value.toLowerCase();
    const ustensilValue = ustensilFilter.value.toLowerCase();

    const recettesFiltrees = recettesData.filter(recette => {
        const hasIngredient = ingredientValue === "" || recette.ingredients.some(ing => ing.ingredient.toLowerCase().includes(ingredientValue));
        const hasAppliance = applianceValue === "" || recette.appliance.toLowerCase().includes(applianceValue);
        const hasUstensil = ustensilValue === "" || recette.ustensils.some(ustensil => ustensil.toLowerCase().includes(ustensilValue));

        return hasIngredient && hasAppliance && hasUstensil;
    });

    afficherRecettes(recettesFiltrees);
}
