import {Component} from "react";

import './randomChar.scss';

import mjolnir from '../../resources/img/mjolnir.png';
import MarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

class RandomChar extends Component {

  state = {
    character: {},
    isLoading: true,
    hasError: false,
  }

  marvelService = new MarvelService();

  componentDidMount() {
    this.updateCharacter();
  }

  updateCharacter = () => {
    this.onCharLoading();
    const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
    this.marvelService
      .getCharacter(id)
      .then(this.onCharacterLoaded)
      .catch(this.onLoadingError);
  }

  onCharLoading = () => {
    this.setState({
      isLoading: true
    })
  }

  onCharacterLoaded = (character) => {
    this.setState(
      {
        character,
        isLoading: false,
        hasError: false
      }
    );
  }

  onLoadingError = () => {
    this.setState(
      {
        isLoading: false,
        hasError: true
      }
    );
  }

  render() {
    const {character, isLoading, hasError} = this.state;

    const errorMessage = hasError ? <ErrorMessage/> : null;
    const spinner = isLoading ? <Spinner/> : null;
    const content = !(isLoading || hasError) ? <View character={character}/> : null;

    return (
      <div className="randomchar">
        {errorMessage}
        {spinner}
        {content}
        <div className="randomchar__static">
          <p className="randomchar__title">
            Random character for today!<br/>
            Do you want to get to know him better?
          </p>
          <p className="randomchar__title">
            Or choose another one
          </p>
          <button className="button button__main"
                  onClick={this.updateCharacter}>
            <div className="inner">try it</div>
          </button>
          <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
        </div>
      </div>
    );
  }
}

const View = ({character}) => {

  const {name, thumbnail, description, homepage, wiki} = character;

  const noImageSrc = 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg';
  const imgStyle = thumbnail === noImageSrc ? {objectFit: 'contain'} : {objectFit: 'cover'};

  return (
    <div className="randomchar__block">
      <img src={thumbnail} alt="Random character" className="randomchar__img" style={imgStyle}/>
      <div className="randomchar__info">
        <p className="randomchar__name">{name}</p>
        <p className="randomchar__descr">
          {description}
        </p>
        <div className="randomchar__btns">
          <a href={homepage} className="button button__main">
            <div className="inner">homepage</div>
          </a>
          <a href={wiki} className="button button__secondary">
            <div className="inner">Wiki</div>
          </a>
        </div>
      </div>
    </div>
  )
}

export default RandomChar;
