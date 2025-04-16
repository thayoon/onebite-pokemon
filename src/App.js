import PokemonList from "./components/PokemonList.js";
import { getPokemonList } from "./modules/api.js";

export default function App($app) {
  const getSearchWord = () => {
    if (window.location.search.includes("search=")) {
      return window.location.search.split("search=")[1];
    }
    return "";
  };

  this.state = {
    type: "",
    pokemonList: [],
    searchWord: getSearchWord(),
    currentPage: window.location.pathname,
  };

  const pokemonList = new PokemonList({
    $app,
    initialState: this.state.pokemonList,
    handleItemClick: (id) => {
      history.pushState(null, null, `detail/${id}`);
      this.setState({
        ...this.state,
        currentPage: `/detail/${id}`,
      });
    },
    handleTypeClick: async (type) => {
      history.pushState(null, null, `${type}`);
      const pokemonTypeList = await getPokemonList(type);
      this.setState({
        ...this.state,
        type: type,
        pokemonList: pokemonTypeList,
        currentPage: `/${type}`,
      });
    },
  });

  this.setState = (newState) => {
    this.state = newState;
    pokemonList.setState(this.state.pokemonList);
  };

  const init = async () => {
    const pokemonList = await getPokemonList();
    this.setState({
      ...this.state,
      pokemonList: pokemonList,
    });
  };

  init();
}
