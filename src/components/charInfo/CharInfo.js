import {useEffect, useState} from "react";
import PropTypes from 'prop-types';

import './charInfo.scss';
import MarvelService from "../../services/MarvelService";

import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Skeleton from "../skeleton/Skeleton";

const CharInfo = (props) => {

  const [charInfo, setCharInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    updateCharInfo();
  }, [props.charId])

  const marvelService = new MarvelService();
  const onCharInfoLoading = () => {
    setIsLoading(true);
  }

  const updateCharInfo = () => {
    const {charId} = props;
    if (!charId) {
      return;
    }
    onCharInfoLoading();
    marvelService.getCharacter(charId)
      .then(onCharacterInfoLoaded)
      .catch(onCharInfoLoadingError)
  }

  const onCharacterInfoLoaded = (charInfo) => {
    setCharInfo(charInfo);
    setIsLoading(false);
    setHasError(false);
  }

  const onCharInfoLoadingError = () => {
    setIsLoading(false);
    setHasError(true);
  }

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

CharInfo.propTypes = {
  charId: PropTypes.number,
}

export default CharInfo;
