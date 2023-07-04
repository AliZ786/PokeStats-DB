import React, { useState } from "react";
import Pokedex from "pokedex-promise-v2";
import "./PokemonDetails.css";

const P = new Pokedex();

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
          <h2>{pokemonData.name}</h2>
          <div>
            <h3>Type(s):</h3>
            <ul>
              {pokemonData.types.map((type) => (
                <li key={type.type.name}>
                  <button className="type-button">{type.type.name}</button>
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
