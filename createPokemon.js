const fs = require("fs");
const csv = require("csvtojson");

const createPokemon = async () => {
  let data = JSON.parse(fs.readFileSync("db.json"));
  let pokemonData = await csv().fromFile("pokemon.csv");
  pokemonData = Array.from(pokemonData);

  for (let i = 0; i < 721; i++) {
    const type2 = pokemonData[i]["Type2"];
    const types = [pokemonData[i]["Type1"]];

    if (type2 !== "") {
      types.push(type2);
    }

    const pokemon = {
      id: i + 1,
      name: pokemonData[i]["Name"],
      types,
      url: `http://localhost:8000/images/${i + 1}.png`,
    };
    data.data.push(pokemon);
  }
  fs.writeFileSync("db.json", JSON.stringify(data));
};

createPokemon();
