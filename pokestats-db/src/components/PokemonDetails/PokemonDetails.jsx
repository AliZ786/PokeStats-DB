import React, { useEffect, useState } from "react";
import Pokedex from "pokedex-promise-v2";

const P = new Pokedex();

function PokemonDetails() {
  const [pokemonData, setPokemonData] = useState(null);

  useEffect(() => {
    // Make API request and update state
    P.getPokemonByName("pikachu")
      .then((response) => {
        setPokemonData(response);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }, []);

  return (
    <div>
      {/* Render Pokemon details */}
      {pokemonData && (
        <div>
          <h2>{pokemonData.name}</h2>
          {/* Display other Pokemon details */}
        </div>
      )}
    </div>
  );
}

export default PokemonDetails;
