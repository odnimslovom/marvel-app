import {useState} from "react";

import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

import decoration from '../../resources/img/vision.png';
import ComicsList from "../comicsList/ComicsList";

const App = () => {

  const [selectedCharId, setSelectedCharId] = useState(0);

  const onCharSelected = (id) => {
    setSelectedCharId(id);
  }

  return (
    <div className="app">
      <AppHeader/>
      <main>
        {/*<ErrorBoundary>*/}
        {/*  <RandomChar/>*/}
        {/*</ErrorBoundary>*/}
        {/*<div className="char__content">*/}
        {/*  <ErrorBoundary>*/}
        {/*    <CharList onCharSelected={onCharSelected}/>*/}
        {/*  </ErrorBoundary>*/}
        {/*  <ErrorBoundary>*/}
        {/*    <CharInfo charId={selectedCharId}/>*/}
        {/*  </ErrorBoundary>*/}
        {/*</div>*/}
        {/*<img className="bg-decoration" src={decoration} alt="vision"/>*/}
        <ComicsList />
      </main>
    </div>
  )
}

export default App;
