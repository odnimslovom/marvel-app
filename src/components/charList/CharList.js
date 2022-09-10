import {Component} from "react";

import './charList.scss';
import MarvelService from "../../services/MarvelService";

import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";

class CharList extends Component {

  state = {
    characters: [],
    isLoading: true,
    hasError: false,
  }

  marvelService = new MarvelService();

  componentDidMount() {
    this.updateCharactersList();
  }

  updateCharactersList = () => {
    this.marvelService
      .getAllCharacters()
      .then(this.onCharactersListLoaded)
      .catch(this.onCharactersListLoadingError)
  }

  onCharactersListLoadingError = () => {
    this.setState(
      {
        hasError: true,
        isLoading: false
      }
    )
  }

  onCharactersListLoaded = (characters) => {
    this.setState(
      {
        characters,
        isLoading: false,
        hasError: false
      }
    )
  }

  render() {

    const {characters, isLoading, hasError} = this.state;

    const errorMessage = hasError ? <ErrorMessage/> : null;
    const spinner = isLoading ? <Spinner/> : null;
    //const content = !(isLoading || hasError) ? <View character={character}/> : null;

    const content = characters.map(character => {

      const noImageSrc = 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg';
      const imgStyle = character.thumbnail === noImageSrc ? {objectFit: 'contain'} : {objectFit: 'cover'};

      return <CharacterListItem key={character.name}
                                name={character.name}
                                src={character.thumbnail}
                                style={imgStyle}
      />
    })

    return (
      <div className="char__list">
        {spinner}
        {errorMessage}
        <ul className="char__grid">
          {content}
        </ul>
        <button className="button button__main button__long">
          <div className="inner">load more</div>
        </button>
      </div>
    )
  }

}

const CharacterListItem = ({name, src}) => {
  return (
    <li className="char__item">
      <img src={src} alt={name}/>
      <div className="char__name">{name}</div>
    </li>
  )
}

export default CharList;
