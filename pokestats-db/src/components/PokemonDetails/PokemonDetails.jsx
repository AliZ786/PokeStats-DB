import React, { useState } from "react";
import Pokedex from "pokedex-promise-v2";
import "./PokemonDetails.css";

const P = new Pokedex();

const TYPES = [
  { name: "normal", color: "#FFE4C4", textColor: "#000000" },
  { name: "fire", color: "#FF6347", textColor: "#FFFFFF" },
  { name: "water", color: "#00FFFF", textColor: "#FFFFF" },
  { name: "grass", color: "#808000", textColor: "#FFFFF" },
  { name: "electric", color: "#FFFF00", textColor: "#000000" },
  { name: "ice", color: "#87CEEB", textColor: "#000000" },
  { name: "fighting", color: "#8B0000", textColor: "#FFFFFF" },
  { name: "poison", color: "#191970", textColor: "#000000" },
  { name: "ground", color: "#F0E68C", textColor: "#000000" },
  { name: "flying", color: "#AFEEEE", textColor: "#000000" },
  { name: "psychic", color: "#FF00FF", textColor: "#FFFFFF" },
  { name: "bug", color: "#00FF00", textColor: "#FFFFFF" },
  { name: "rock", color: "#F08080", textColor: "#FFFFFF" },
  { name: "ghost", color: "#663399", textColor: "#FFFFFF" },
  { name: "dark", color: "#000000", textColor: "#FFFFFF" },
  { name: "dragon", color: "#00008B", textColor: "#FFFFFF" },
  { name: "steel", color: "#7FFFD4", textColor: "#000000" },
  { name: "fairy", color: "#48D1CC", textColor: "#FFFFFF" },
];

function PokemonDetails() {
  const [pokemonName, setPokemonName] = useState("");
  const [pokemonData, setPokemonData] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = () => {
    // Reset error message
    setError("");

    // Make API request and update state
    P.getPokemonByName(pokemonName.toLowerCase())
      .then((response) => {
        setPokemonData(response);
      })
      .catch((error) => {
        setError("This Pokemon does not exist");
        console.log("Error:", error);
      });
  };

  const getButtonType = (typeName) => {
    const type = TYPES.find((type) => type.name === typeName.toLowerCase());
    return type ? { backgroundColor: type.color, color: type.textColor } : {};
  };

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Enter Pokemon name"
          value={pokemonName}
          onChange={(e) => setPokemonName(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {/* Render Pokemon details or error message */}
      {pokemonData ? (
        <div>
          <h2 className="pokemon-name">{pokemonData.name}</h2>
          <div>
            <h3>Type(s):</h3>
            <ul>
              {pokemonData.types.map((type) => (
                <li key={type.type.name}>
                  <button
                    className="type-button"
                    style={getButtonType(type.type.name)}
                  >
                    {type.type.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        error && <h3>{error}</h3>
      )}
    </div>
  );
}

export default PokemonDetails;
