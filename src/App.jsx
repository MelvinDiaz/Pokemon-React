import "./App.css";
import { useState } from "react";
import axios from "axios";
import Footer from "./footer/footer";
import "bootstrap/dist/css/bootstrap.min.css";
import * as ReactBootStrap from "react-bootstrap";
import Swal from "sweetalert2";
import SavedPokemon from "./SavedPokemons/SavedPokemons";

function App() {
  const [pokemonName, setPokemonName] = useState("");
  const [pokemon, setPokemon] = useState({
    name: "",
    species: "",
    sprite: "",
    hp: "",
    attack: "",
    defense: "",
    speed: "",
    types: "",
  });
  const [pokemonChosen, setPokemonChosen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleKeypress = (e) => {
    if (e.keyCode === 13) {
      searchPokemon(e);
    }
  };
  const searchPokemon = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      .then((response) => {
        console.log(response.data);
        setPokemon({
          name: response.data.name,
          sprite: response.data.sprites.front_default,
          hp: response.data.stats[0].base_stat,
          attack: response.data.stats[1].base_stat,
          defense: response.data.stats[2].base_stat,
          speed: response.data.stats[5].base_stat,
          type: response.data.types[0].type.name,
        });
        setPokemonChosen(true);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setPokemonChosen(false);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'This pokemon does not exist!',
          
        })
        console.log(error);
        
      });
  };
  const pokemonSaved= [];
  const savePokemon = () => {
    pokemonSaved.push(pokemon);
    console.log(pokemonSaved);
  };

  return (
    <div className="App">
      <div className="title-section">
        <h1>React Pokemon</h1>
        <form className="search-form" onKeyDown={handleKeypress}>
          <input
            type="text"
            onChange={(event) => {
              setPokemonName(event.target.value.toLowerCase());
            }}
          />
          <button
            className="glow-on-hover"
            type="submit"
            onClick={searchPokemon}
          >
            Search Pokemon
          </button>
        </form>
      </div>
      <div className="pokemon-section">
        {!pokemonChosen ? (
          <h1>Please, chose a pokemon</h1>
        ) : (
          <>
            {loading ? (
              <ReactBootStrap.Spinner animation="border" />
            ) : (
              <div className="pokemon-card" id={pokemon.type}>
                <div className="card-left">
                  <h1>{pokemon.name.toUpperCase()}</h1>
                  <img src={pokemon.sprite} alt={pokemon.name} />

                  <h2>Type: {pokemon.type}</h2>
                </div>
                <div className="card-right">
                  <h2>HP: {pokemon.hp}</h2>
                  <h2>Attack: {pokemon.attack}</h2>
                  <h2>Defense: {pokemon.defense}</h2>
                  <h2>Speed: {pokemon.speed}</h2>
                  <div className="save-button">
            <button className="save-button__button" onClick={savePokemon}>Save</button>
        </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
      <SavedPokemon/>
      <Footer/>
    </div>
  );
}

export default App;
