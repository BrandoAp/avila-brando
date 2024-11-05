import { getEvolution, renderPokemon, sanitizeName, getPokemon } from "./pokedex.js";

const htmlElements = {
    form : document.querySelector('form'),
    details_section : document.querySelector('#details'),
    clear_button : document.querySelector('#clear-button'),
}

const handlers = {
    submit: async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const pokemonName = formData.get('pokemon-name');
        const sanitizedName = sanitizeName(pokemonName);
        if (!sanitizedName){
            alert ('Por favor, ingrese un nombre valido');
            htmlElements.clear_button.style.display = 'none';
            return;
        };
        const pokemon = await getPokemon(sanitizedName);
        const evolutionChain = await getEvolution(sanitizedName);
        pokemon.evolution_chain = evolutionChain;
        renderPokemon(htmlElements.details_section, pokemon);

        htmlElements.clear_button.style.display = 'block';
    },
    clear: () => {
        htmlElements.details_section.innerHTML = '';
        htmlElements.clear_button.style.display = 'none'
    }
}

const bindEvent = () => {
    htmlElements.form.addEventListener('submit', handlers.submit);
    htmlElements.form.addEventListener('click', handlers.clear);
}

const init = () => {
    bindEvent();
}

init();