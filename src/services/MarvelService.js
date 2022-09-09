class MarvelService {

    _apiBaseUrl = 'https://gateway.marvel.com:443/v1/public/';
    _apiToken = 'apikey=ad6f4475dffe94fda4246a92a833cb94';

    _transformCharacterData = (character) => {
      const defaultDescription = "Nothing description for this character.";
      return ({
        name: character.name,
        description: character.description ? character.description : defaultDescription,
        thumbnail:
          character.thumbnail.path + '.' + character.thumbnail.extension,
        homepage: character.urls[0].url,
        wiki: character.urls[1].url,
      });
    }

     getResource = async (url) =>{
        let res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
        return await res.json();
    }

    getAllCharacters = async () =>{
         const res = await this.getResource(`${this._apiBaseUrl}characters?offset=0&limit=9&${this._apiToken}`);
         return res.data.results.map(this._transformCharacterData)
    }

    getCharacter = async(id) =>{
        const res = await this.getResource(`${this._apiBaseUrl}characters/${id}?offset=0&limit=9&${this._apiToken}`);
        return this._transformCharacterData(res.data.results[0]);
    }
}

export default MarvelService;
