import {Component} from "react";
import PropTypes from "prop-types";

import './charList.scss';
import MarvelService from "../../services/MarvelService";

import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";

class CharList extends Component {

  state = {
    characters: [],
    isLoading: true,
    hasError: false,
    isRequested: false,
    offset: 0,
    isCharListEnded: false
  }

  marvelService = new MarvelService();

  componentDidMount() {
    this.onRequest();
  }

  onRequest = (offset) => {
    this.onCharListLoading();
    this.marvelService.getAllCharacters(offset)
      .then(this.onCharactersListLoaded)
      .catch(this.onCharactersListLoadingError)
  }

  onCharListLoading = () => {
    this.setState({
      isRequested: true,
    })
  }

  onCharactersListLoaded = (charactersList) => {

    let ended = false;
    if (charactersList.length < 9) {
      ended = true;
    }

    this.setState(({characters, offset}) => ({
      characters: [...characters, ...charactersList],
      isLoading: false,
      hasError: false,
      isRequested: false,
      offset: offset + 9,
      isCharListEnded: ended,
    }));
  }

  onCharactersListLoadingError = () => {
    this.setState(
      {
        hasError: true,
        isLoading: false,
        isRequested: false,
      }
    )
  }

  itemRefs = [];
  setRef = (ref) => {
    this.itemRefs.push(ref);
  }

  itemFocus = (id) => {
    this.itemRefs.forEach(item => item.classList.remove('char__item_selected'));
    this.itemRefs[id].classList.add('char__item_selected');
    this.itemRefs[id].focus();
  }

  render() {

    const {characters, isLoading, hasError, isRequested, offset, isCharListEnded} = this.state;
    const content = characters.map((character, idx) => {
      const {id, name, thumbnail, } = character;
      const noImageSrc = 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg';
      const imgStyle = thumbnail === noImageSrc ? {objectFit: 'contain'} : {objectFit: 'cover'};
      return (
        <li key={id}
            className="char__item"
            ref={this.setRef}
            tabIndex={0}
            onClick={
              () => {
                this.props.onCharSelected(id);
                this.itemFocus(idx);
              }
            }
            onKeyDown={(e) => {
              if (e.key === ' ' || e.key === "Enter") {
                this.props.onCharSelected(id);
                this.itemFocus(idx);
              }
            }}>
        >
          <img src={thumbnail} alt={name} style={imgStyle}/>
          <div className="char__name">{name}</div>
        </li>
      )
    })
    const errorMessage = hasError ? <ErrorMessage/> : null;
    const spinner = isLoading ? <Spinner/> : null;
    const charList = !(isLoading || hasError) ? content : null;

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
                  onClick={() => this.onRequest(offset)}
                  disabled={isRequested}>
            <div className="inner">
              {isRequested ? "loading..." : "load more"}
            </div>
          </button>
        }
      </div>
    )
  }
}

CharList.propTypes = {
  onCharSelected: PropTypes.func.isRequired,
}

export default CharList;
