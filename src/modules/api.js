const API_URL = "https://pokemon-api-ecru-eta.vercel.app/";

// 포켓몬 전체 데이터
export const getPokemonList = async (type, searchWord) => {
  let url = API_URL;
  if (type) {
    url += `${type}`;
  }
  if (searchWord) {
    url += `?search=${searchWord}`;
  }
  try {
    const res = await fetch(url);
    const pokemonList = await res.json();
    return pokemonList.data;
  } catch (error) {
    console.log(error);
  }
};

// 포켓몬 상세 데이터
export const getPokemonDetail = async (id) => {
  const url = API_URL + "detail/" + id;
  try {
    const res = await fetch(url);
    const pokemonDetails = await res.json();
    return pokemonDetails.data;
  } catch (error) {
    console.log(error);
  }
};
