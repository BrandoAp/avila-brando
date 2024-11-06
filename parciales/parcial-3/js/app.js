import {
  getEvolution,
  renderPokemon,
  sanitizeName,
  getPokemon,
  getAbilities,
  renderAbilities,
} from "./pokedex.js";

const htmlElements = {
  form: document.querySelector("form"),
  details_section: document.querySelector("#details"),
  select: document.querySelector("#type-search"),
  clear_button: document.querySelector("#clear-button"),
};

const handlers = {
  submit: async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const searchType = htmlElements.select.value;
    const pokemonName = formData.get("pokemon-name");
    const sanitizedName = sanitizeName(pokemonName);

    if (!sanitizedName) {
      alert("Por favor, ingrese un nombre valido");
      htmlElements.clear_button.style.display = "none";
      return;
    }

    if (searchType === "pokemon") {
      const pokemon = await getPokemon(sanitizedName);
      const evolutionChain = await getEvolution(sanitizedName);
      pokemon.evolution_chain = evolutionChain;
      renderPokemon(htmlElements.details_section, pokemon);
    } else if (searchType === "abilities") {
      const abilities = await getAbilities(sanitizedName);
      renderAbilities(htmlElements.details_section, abilities);
    }

    htmlElements.clear_button.style.display = "block";
  },
  clear: () => {
    htmlElements.details_section.innerHTML = "";
    htmlElements.clear_button.style.display = "none";
  },
  onChange: () => {
    htmlElements.details_section.innerHTML = "";
    htmlElements.clear_button.style.display = "none";
  },
};

const bindEvent = () => {
  htmlElements.form.addEventListener("submit", handlers.submit);
  htmlElements.clear_button.addEventListener("click", handlers.clear);
  htmlElements.select.addEventListener("change", handlers.onChange);
};

const init = () => {
  bindEvent();
};

init();
