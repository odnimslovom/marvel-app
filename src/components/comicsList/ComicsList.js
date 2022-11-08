import './comicsList.scss';

import {useEffect, useState} from "react";
import {Link} from "react-router-dom"

import useMarvelService from "../../services/MarvelService";

import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";
import {CSSTransition, TransitionGroup} from "react-transition-group";


const ComicsList = () => {

  const {getAllComics, isLoading, hasError} = useMarvelService();
  const [comics, setComics] = useState([]);
  const [isRequested, setIsRequested] = useState(false);
  const [offset, setOffset] = useState(0);
  const [isComicsListEnded, setIsComicsListEnded] = useState(false);

  useEffect(() => {
    onRequest(offset, true)
  }, []);

  const onRequest = (offset, initial) => {
    initial ? setIsRequested(false) : setIsRequested(true);
    getAllComics(offset)
      .then(onComicsListLoaded);
  }

  const onComicsListLoaded = (comicsList) => {
    let ended = false;
    if (comicsList.length < 8) {
      ended = true;
    }
    setComics([...comics, ...comicsList]);
    setIsRequested(false);
    setOffset(offset => offset + 8);
    setIsComicsListEnded(ended);
  }

  function renderItems(arr) {
    const items = arr.map((item, idx) => {
      return (
        <CSSTransition key={idx} timeout={500} classNames={"comics__item"}>
          <li className="comics__item">
            <Link to={`/comics/${item.id}`}>
              <img src={item.thumbnail} alt={item.title} className="comics__item-img"/>
              <div className="comics__item-name">{item.title}</div>
              <div className="comics__item-price">{item.price}</div>
            </Link>
          </li>
        </CSSTransition>
      )
    });

    return (
      <ul className="comics__grid">
        <TransitionGroup component={null}>
          {items}
        </TransitionGroup>
      </ul>
    )
  }

  const items = renderItems(comics);
  const errorMessage = hasError ? <ErrorMessage/> : null;
  const spinner = isLoading && !isRequested ? <Spinner/> : null;

  return (
    <div className="comics__list">
      {errorMessage}
      {spinner}
      {items}
      <button
        disabled={isRequested}
        style={{'display': isComicsListEnded ? 'none' : 'block'}}
        className="button button__main button__long"
        onClick={() => onRequest(offset)}>
        <div className="inner">{isRequested ? 'loading...' : 'load more'}</div>
      </button>
    </div>
  )
}

export default ComicsList;
