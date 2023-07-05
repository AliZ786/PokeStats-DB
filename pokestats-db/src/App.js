import React from "react";
import PokemonDetails from "./components/PokemonDetails/PokemonDetails.jsx";
import TypesDisplay from "./components/TypesDisplay/TypesDisplay.jsx";

function App() {
  return (
    <>
      <h1>Pokémon Details</h1>
      <PokemonDetails />
      <main className="main">
        <TypesDisplay />
      </main>
    </>
  );
}

export default App;
