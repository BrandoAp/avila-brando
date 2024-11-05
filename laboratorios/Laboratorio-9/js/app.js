import { getPokemon, renderPokemon, sanitizeName } from './pokemon.js';

const htmlElements = {
    form: document.querySelector('#pokemon-form'),
    details: document.querySelector('#pokemon-details'),
    clearButton : document.querySelector('#button-clear')
} 

const handlers = {
    submit: async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const pokemonName = formData.get('pokemon-name');
        const sanitizedName = sanitizeName(pokemonName);
        if(!sanitizedName) {
            alert('Por favor, ingrese un nombre valido');
            htmlElements.clearButton.style.display = 'none';
            return;
        };
        const pokemon = await getPokemon(sanitizedName);
        renderPokemon(htmlElements.details, pokemon);

        htmlElements.clearButton.style.display = 'block';
    },
    clear: () => {
        htmlElements.details.innerHTML = '';
        htmlElements.clearButton.style.display = 'none';
    }
}
const bindEvents = () => {
    htmlElements.form.addEventListener('submit', handlers.submit);
    htmlElements.clearButton.addEventListener('click', handlers.clear);
}

const init = () => {
    bindEvents();
}

init();