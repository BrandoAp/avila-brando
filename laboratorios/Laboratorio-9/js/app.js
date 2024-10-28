
const App = (() => {
    const htmlElements = {
        form : document.querySelector('form'),
        input_pokemon : document.querySelector('#input-pokemon'),
        button_find_pokemon : document.querySelector('#button-find-pokemon'),
    }

    const handlers = {
        onFormSubmit (e) {
            let pokemon_name = htmlElements.input_pokemon.value;
        }
    }

    const bindEvents = () => {
        htmlElements.form.addEventListener('click', handlers.onFormSubmit);
    }
})()