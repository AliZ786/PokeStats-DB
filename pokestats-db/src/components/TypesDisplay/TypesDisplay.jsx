import React, { useState, useEffect } from "react";
import Pokedex from "pokedex-promise-v2";
import "./TypesDisplay.css";

const P = new Pokedex();

const TYPES = [
  { name: "normal", color: "#FFE4C4", textColor: "#000000" },
  { name: "fire", color: "#FF6347", textColor: "#FFFFFF" },
  { name: "water", color: "#00FFFF", textColor: "#FFFFFF" },
  { name: "grass", color: "#808000", textColor: "#FFFFFF" },
  { name: "electric", color: "#FFFF00", textColor: "#000000" },
  { name: "ice", color: "#87CEEB", textColor: "#000000" },
  { name: "fighting", color: "#8B0000", textColor: "#FFFFFF" },
  { name: "poison", color: "#191970", textColor: "#FFFFFF" },
  { name: "ground", color: "#F0E68C", textColor: "#000000" },
  { name: "flying", color: "#AFEEEE", textColor: "#000000" },
  { name: "psychic", color: "#FF00FF", textColor: "#FFFFFF" },
  { name: "bug", color: "#00FF00", textColor: "#FFFFFF" },
  { name: "rock", color: "#F08080", textColor: "#FFFFFF" },
  { name: "ghost", color: "#663399", textColor: "#FFFFFF" },
  { name: "dark", color: "#000000", textColor: "#FFFFFF" },
  { name: "dragon", color: "#00008B", textColor: "#FFFFFF" },
  { name: "steel", color: "#7FFFD4", textColor: "#000000" },
  { name: "fairy", color: "#FFC1CC", textColor: "#FFFFFF" },
];

function capitalizeName(name) {
  // Split the name by hyphen if present
  const nameParts = name.split("-");

  // Capitalize the first letter of each part
  const capitalizedParts = nameParts.map(
    (part) => part.charAt(0).toUpperCase() + part.slice(1)
  );

  // Join the capitalized parts with hyphen and return the result
  return capitalizedParts.join("-");
}

function TypesDisplay() {
  const [selectedType, setSelectedType] = useState(null);
  const [pokemonOfType, setPokemonOfType] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [pokemonDetails, setPokemonDetails] = useState(null);

  useEffect(() => {
    if (selectedType) {
      P.getTypeByName(selectedType)
        .then((response) => {
          const pokemonList = response.pokemon.map((pokemon) => ({
            name: pokemon.pokemon.name,
            id: pokemon.pokemon.url.split("/")[6],
          }));
          setPokemonOfType(pokemonList);
        })
        .catch((error) => {
          console.log("Error:", error);
        });
    }
  }, [selectedType]);

  const handleTypeClick = (type) => {
    setSelectedType(type);
    setSelectedPokemon(null);
    setPokemonDetails(null);
  };

  const handlePokemonClick = (pokemonName) => {
    if (pokemonName === selectedPokemon) {
      setSelectedPokemon(null);
      setPokemonDetails(null);
    } else {
      setSelectedPokemon(pokemonName);
      P.getPokemonByName(pokemonName)
        .then((response) => {
          setPokemonDetails(response);
        })
        .catch((error) => {
          console.log("Error:", error);
        });
    }
  };

  const getButtonType = (typeName) => {
    const type = TYPES.find((type) => type.name === typeName.toLowerCase());
    return type ? { backgroundColor: type.color, color: type.textColor } : {};
  };

  return (
    <div className="main">
      <div className="sidebar">
        <h2>Pokemon Types</h2>
        {TYPES.map((type) => (
          <button
            key={type.name}
            className={`type-button ${
              selectedType === type.name ? "active" : ""
            }`}
            style={getButtonType(type.name)}
            onClick={() => handleTypeClick(type.name)}
          >
            {type.name}
          </button>
        ))}
      </div>
      <section className="content">
        {selectedType && (
          <>
            <h3>Pokemon of type {selectedType}:</h3>
            {pokemonOfType.length > 0 ? (
              <ul>
                {pokemonOfType.map((pokemon) => (
                  <li key={pokemon.name} className="pokemon-name">
                    <button
                      className={`pokemon-button ${
                        selectedPokemon === pokemon.name ? "active" : ""
                      }`}
                      onClick={() => handlePokemonClick(pokemon.name)}
                    >
                      <img
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
                        alt={pokemon.name}
                        className="pokemon-sprite"
                      />
                      <div>
                        <span className="pokedex-number">#{pokemon.id}</span>
                        <span className="pokemon-name-text">
                          {capitalizeName(pokemon.name)}
                        </span>
                      </div>
                    </button>
                    {selectedPokemon === pokemon.name && pokemonDetails && (
                      <div className="pokemon-details">
                        <h4>{capitalizeName(selectedPokemon)} Stats:</h4>
                        <ul>
                          {pokemonDetails.stats.map((stat, index) => (
                            <li key={index}>
                              {`${stat.stat.name.toUpperCase()}: ${
                                stat.base_stat
                              }`}
                            </li>
                          ))}
                          <p>
                            Base Stat Total:{" "}
                            {pokemonDetails.stats.reduce(
                              (acc, stat) => acc + stat.base_stat,
                              0
                            )}
                          </p>
                          Types:
                          {pokemonDetails.types.map((type, index) => (
                            <li
                              className="type-button"
                              key={index}
                              style={getButtonType(type.type.name)}
                            >
                              {type.type.name}
                            </li>
                          ))}
                          Abilities:
                          {pokemonDetails.abilities.map((entry, index) => (
                            <li key={index}>
                              {entry.is_hidden ? (
                                <div className="hidden">
                                  Hidden Ability: {entry.ability.name}
                                </div>
                              ) : (
                                entry.ability.name
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No Pokemon found for this type.</p>
            )}
          </>
        )}
      </section>
    </div>
  );
}

export default TypesDisplay;
