import {useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";

import './charList.scss';
import useMarvelService from "../../services/MarvelService";

import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";

const CharList = (props) => {

  const [characters, setCharacters] = useState([]);
  const [isRequested, setIsRequested] = useState(false);
  const [offset, setOffset] = useState(0);
  const [isCharListEnded, setIsCharListEnded] = useState(false);

  const {isLoading, hasError, getAllCharacters, clearError} = useMarvelService();

  useEffect(() => {
    onRequest(offset, true);
  }, [])

  const onRequest = (offset, initial) => {
    initial ? setIsRequested(false) : setIsRequested(true);
    getAllCharacters(offset)
      .then(onCharactersListLoaded)
  }

  const onCharactersListLoaded = (charactersList) => {
    let ended = false;
    if (charactersList.length < 9) {
      ended = true;
    }
    setCharacters(characters => [...characters, ...charactersList]);
    setIsRequested(false);
    setOffset(offset => offset + 9);
    setIsCharListEnded(ended);
  }

  const itemRefs = useRef([]);
  const itemFocus = (id) => {
    itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
    itemRefs.current[id].classList.add('char__item_selected');
    itemRefs.current[id].focus();
  }

  const renderCharacters = (characters) => {
    return characters.map((character, idx) => {
      const {id, name, thumbnail,} = character;
      const noImageSrc = 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg';
      const imgStyle = thumbnail === noImageSrc ? {objectFit: 'contain'} : {objectFit: 'cover'};
      return (
        <li key={id}
            className="char__item"
            ref={(elem) => {
              itemRefs.current[idx] = elem
            }}
            tabIndex={0}
            onClick={
              () => {
                props.onCharSelected(id);
                itemFocus(idx);
              }
            }
            onKeyDown={(e) => {
              if (e.key === ' ' || e.key === "Enter") {
                props.onCharSelected(id);
                itemFocus(idx);
              }
            }}>
          >
          <img src={thumbnail} alt={name} style={imgStyle}/>
          <div className="char__name">{name}</div>
        </li>
      )
    });
  }

  const errorMessage = hasError ? <ErrorMessage/> : null;
  const spinner = isLoading && !isRequested ? <Spinner/> : null;
  const charList = renderCharacters(characters);

  return (
    <div className="char__list">
      {spinner}
      {errorMessage}
      <ul className="char__grid">
        {charList}
      </ul>
      {
        !isCharListEnded
        &&
        <button className="button button__main button__long"
                onClick={() => onRequest(offset)}
                disabled={isRequested}>
          <div className="inner">
            {isRequested ? "loading..." : "load more"}
          </div>
        </button>
      }
    </div>
  )
}

CharList.propTypes = {
  onCharSelected: PropTypes.func.isRequired,
}

export default CharList;
