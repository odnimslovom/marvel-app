import {useHttp} from "../hooks/http.hook";

const useMarvelService = () => {

  const {isLoading, hasError, clearError, request} = useHttp();

  const _apiBaseUrl = 'https://gateway.marvel.com:443/v1/public/';
  const _apiToken = 'apikey=ad6f4475dffe94fda4246a92a833cb94';
  const _offset = 0;

  const getAllCharacters = async (offset = _offset) => {
    const res = await request(`${_apiBaseUrl}characters?offset=${offset}&limit=9&${_apiToken}`);
    return res.data.results.map(_transformCharacterData)
  }

  const getCharacter = async (id) => {
    const res = await request(`${_apiBaseUrl}characters/${id}?${_apiToken}`);
    return _transformCharacterData(res.data.results[0]);
  }

  const _transformCharacterData = (character) => {
    const defaultDescription = "Nothing description for this character.";
    return ({
      id: character.id,
      name: character.name,
      description: character.description ? character.description : defaultDescription,
      thumbnail:
        character.thumbnail.path + '.' + character.thumbnail.extension,
      homepage: character.urls[0].url,
      wiki: character.urls[1].url,
      comics: character.comics.items
    });
  }

  return {isLoading, hasError, getCharacter, getAllCharacters, clearError};
}

export default useMarvelService;
