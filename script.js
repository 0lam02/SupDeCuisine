const recettesContainer = document.getElementById("recettes-container");

fetch("recipes.json")
    .then(response => {
        if (!response.ok) {
            throw new Error("Erreur de chargement des données");
        }
        return response.json();
    })
    .then(data => {
        afficherRecettes(data);
    })
    .catch(error => {
        console.error("Erreur:", error);
    });

// Fonction pour afficher les recettes
function afficherRecettes(recettes) {
    recettes.forEach(recette => {
        const card = document.createElement("div");
        card.classList.add("recette-card");

        // Image de la recette
        const img = document.createElement("img");
        img.src = `images/JSON recipes/${recette.image}`;
        img.alt = recette.name;

        // Titre de la recette
        const title = document.createElement("h2");
        title.textContent = recette.name;

        // Temps de préparation et portions
        const details = document.createElement("p");
        details.classList.add("details");
        details.textContent = `Temps: ${recette.time} min | Portions: ${recette.servings}`;

        // Ingrédients
        const ingredientsList = document.createElement("ul");
        recette.ingredients.forEach(ingredient => {
            const ingredientItem = document.createElement("li");
            const quantity = ingredient.quantity ? `${ingredient.quantity} ` : "";
            const unit = ingredient.unit ? `${ingredient.unit} ` : "";
            ingredientItem.textContent = `${quantity}${unit}${ingredient.ingredient}`;
            ingredientsList.appendChild(ingredientItem);
        });

        // Description
        const description = document.createElement("p");
        description.textContent = recette.description;

        // Ustensiles
        const ustensils = document.createElement("p");
        ustensils.classList.add("details");
        ustensils.textContent = `Ustensiles: ${recette.ustensils.join(", ")}`;

        // Appareil
        const appliance = document.createElement("p");
        appliance.classList.add("details");
        appliance.textContent = `Appareil: ${recette.appliance}`;

        // Ajouter les éléments à la carte
        card.appendChild(img);
        card.appendChild(title);
        card.appendChild(details);
        card.appendChild(ingredientsList);
        card.appendChild(description);
        card.appendChild(appliance);
        card.appendChild(ustensils);

        // Ajouter la carte au conteneur
        recettesContainer.appendChild(card);
    });
}
