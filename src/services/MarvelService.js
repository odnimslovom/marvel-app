class MarvelService {

    _apiBaseUrl = 'https://gateway.marvel.com:443/v1/public/';
    _apiToken = 'apikey=ad6f4475dffe94fda4246a92a833cb94';

     getResource = async (url) =>{
        let res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
        return await res.json();
    }

    getAllCharacters = () =>{
         return this.getResource(`${this._apiBaseUrl}characters?offset=0&limit=9&${this._apiToken}`);
    }

    getCharacter = (id) =>{
         return this.getResource(`${this._apiBaseUrl}characters/${id}?offset=0&limit=9&${this._apiToken}`);
    }
}

export default MarvelService;