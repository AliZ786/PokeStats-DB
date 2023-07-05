import React from "react";
import PokemonSearch from "./components/PokemonSearch/PokemonSearch.jsx";
import TypesDisplay from "./components/TypesDisplay/TypesDisplay.jsx";

function App() {
  return (
    <>
      <h1>Pokémon Details</h1>
      <PokemonSearch />
      <main className="main">
        <TypesDisplay />
      </main>
    </>
  );
}

export default App;
