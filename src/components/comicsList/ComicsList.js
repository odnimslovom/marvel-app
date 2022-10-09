import './comicsList.scss';

import {useEffect, useState} from "react";
import {Link, matchPath} from "react-router-dom"

import useMarvelService from "../../services/MarvelService";

import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";


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
        <li className="comics__item" key={idx}>
          <Link to={`/comics/${item.id}`}>
            <img src={item.thumbnail} alt={item.title} className="comics__item-img"/>
            <div className="comics__item-name">{item.title}</div>
            <div className="comics__item-price">{item.price}</div>
          </Link>
        </li>
      )
    });

    return (
      <ul className="comics__grid">
        {items}
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
