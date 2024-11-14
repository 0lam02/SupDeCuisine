import {describe, expect, test, it} from 'vitest';
import {afficherRecettes} from '../script.js';

const recettesMock = [
    {
        name: "Salade de tomates",
        ingredients: [
            { ingredient: "Tomate", quantity: 2 },
            { ingredient: "Basilic", quantity: 1 }
        ],
        appliance: "Saladier",
        ustensils: ["Couteau"]
    },
    {
        name: "Soupe de légumes",
        ingredients: [
            { ingredient: "Carotte", quantity: 3 },
            { ingredient: "Poireau", quantity: 1 }
        ],
        appliance: "Marmite",
        ustensils: ["Louche"]
    }
];

// Test de la fonction afficherRecettes
describe("Tests de la fonction afficherRecettes", () => {
    it("affiche le nombre correct de recettes", () => {
        document.body.innerHTML = '<div id="recettes-container"></div>';
        afficherRecettes(recettesMock);
        const recettesContainer = document.getElementById("recettes-container");
        expect(recettesContainer.children.length).toBe(2);
    });

    it("affiche un message lorsque aucune recette n'est trouvée", () => {
        document.body.innerHTML = '<div id="recettes-container"></div>';
        afficherRecettes([]);
        const recettesContainer = document.getElementById("recettes-container");
        expect(recettesContainer.innerHTML).toContain("Aucune recette ne correspond");
    });
});
