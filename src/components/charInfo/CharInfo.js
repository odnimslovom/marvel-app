import {Component} from "react";

import './charInfo.scss';
import MarvelService from "../../services/MarvelService";

import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Skeleton from "../skeleton/Skeleton";

class CharInfo extends Component {

  state = {
    charInfo: null,
    isLoading: false,
    hasError: false,
  }

  marvelService = new MarvelService();

  updateCharInfo = () => {
    const {charId} = this.props;
    if (!charId) {
      return;
    }

    this.onCharInfoLoading();

    this.marvelService.getCharacter(charId)
      .then(this.onCharacterInfoLoaded)
      .catch(this.onCharInfoLoadingError)
  }

  onCharInfoLoading = () => {
    this.setState({
      isLoading : true
    })
  }

  onCharacterInfoLoaded = (charInfo) => {
    this.setState(
      {
        charInfo,
        isLoading: false,
        hasError: false
      }
    );
  }

  onCharInfoLoadingError = () => {
    this.setState(
      {
        isLoading: false,
        hasError: true
      }
    );
  }

  componentDidMount() {
    this.updateCharInfo();
  }

  componentDidUpdate(prevProps) {
    if (this.props.charId !== prevProps.charId) {
      this.updateCharInfo();
    }
  }

  render() {

    const {charInfo, isLoading, hasError} = this.state;

    const skeleton = charInfo || isLoading || hasError ? null : <Skeleton/>
    const errorMessage = hasError ? <ErrorMessage/> : null;
    const spinner = isLoading ? <Spinner/> : null;

    const content = !(isLoading || hasError || !charInfo) ? <View charInfo={charInfo}/> : null;

    return (
      <div className="char__info">
        {spinner}
        {skeleton}
        {errorMessage}
        {content}
      </div>
    )
  }
}

const View = ({charInfo}) => {

  const {name, thumbnail, homepage, wiki, description, comics} = charInfo;

  const noImageSrc = 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg';
  const imgStyle = thumbnail === noImageSrc ? {objectFit: 'contain'} : {objectFit: 'cover'};

  return (
    <>
      <div className="char__basics">
        <img src={thumbnail} alt={name} style={imgStyle}/>
        <div>
          <div className="char__info-name">{name}</div>
          <div className="char__btns">
            <a href={homepage} className="button button__main">
              <div className="inner">homepage</div>
            </a>
            <a href={wiki} className="button button__secondary">
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className="char__descr">
        {description}
      </div>
      <div className="char__comics">Comics:</div>
      <ul className="char__comics-list">
        {
          comics.length < 0 &&
          <li className="char__comics-item">
            "There is no comics with this character"
          </li>
        }
        {
          comics.slice(0, 10).map((item, idx) => {
            return (
              <li key={idx} className="char__comics-item">
                {item.name}
              </li>
            )
          })
        }
      </ul>
    </>
  )
}

export default CharInfo;
