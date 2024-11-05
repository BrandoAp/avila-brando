const POKE_API_POKEMON = "https://pokeapi.co/api/v2/pokemon";
const POKE_API_EVOLUTION = "https://pokeapi.co/api/v2/pokemon-species/";
const POKE_API_ABILITIES = "https://pokeapi.co/api/v2/ability/";

const sanitizeName = (name_pokemon) => {
  return name_pokemon
    .trim()
    .toLowerCase()
    .replace(/[^a-z]/g, "");
};

const getPokemon = async (name_pokemon) => {
  const response = await fetch(`${POKE_API_POKEMON}/${name_pokemon}/`);
  return response.json();
};

const getEvolution = async (name_pokemon) => {
  const response = await fetch(`${POKE_API_EVOLUTION}/${name_pokemon}/`);
  const speciesDta = await response.json();
  const evolutionEndPoint = speciesDta.evolution_chain.url;

  const evolutionResponse = await fetch(evolutionEndPoint);
  const evolutionData = await evolutionResponse.json();

  const evolutions = [];
  let currentEvolution = evolutionData.chain;

  while (currentEvolution) {
    evolutions.push(currentEvolution.species.name);
    currentEvolution = currentEvolution.evolves_to[0];
  }

  return evolutions;
};

const getAbilities = async (name_ability) => {
  const response = await fetch(`${POKE_API_ABILITIES}/${name_ability}/`);
  return response.json();
};

const renderPokemon = (template, pokemon) => {
  const { id, name, sprites, weight, height, abilities, evolution_chain } =
    pokemon;
  const html = `
  <div class="pokemon-card">
    <div class="pokemon-card_header">
      <h2>${name.charAt(0).toUpperCase() + name.slice(1)} (${id})</h2>
    </div>
    <div class="pokemon-card_body">
      <div class="pokemon-sprites">
        <h3>Sprites</h3>
        <img src="${sprites.front_default}" alt="${name} front" />
        <img src="${sprites.back_default}" alt="${name} back" />
      </div>
      <div class="pokemon-stats">
        <h3>Weight / Height</h3>
        <p>${weight / 10} kg / ${height / 10} m</p>
      </div>
      <div class="pokemon-evolution">
        <h3>Evolution Chain</h3>
        <ul>
          ${evolution_chain
            .map(evolution => `<li>${evolution.charAt(0).toUpperCase() + evolution.slice(1)} </li>`)
            .join("")}
        </ul>
      </div>
      <div class="pokemon-abilities">
        <h3>Abilities</h3>
        <ul>
          ${abilities.map(({ ability }) => `<li>${ability.name}</li>`).join('')}
        </ul>
      </div>
    </div>
  </div>
  `;
  template.innerHTML = html;
};

export { getPokemon, sanitizeName, renderPokemon, getEvolution };
