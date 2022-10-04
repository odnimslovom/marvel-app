import './appHeader.scss';
import {Link, NavLink} from "react-router-dom";

const AppHeader = () => {
  return (
    <header className="app__header">
      <h1 className="app__title">
        <Link to={"/main"}>
          <span>Marvel</span> information portal
        </Link>
      </h1>
      <nav className="app__menu">
        <ul>
          <li><NavLink activeStyle={{'color': '#9f0013', 'borderBottom': '1px solid black'}}
                       exact to={"/main"}>Characters</NavLink></li>
          /
          <li><NavLink activeStyle={{'color': '#9f0013', 'borderBottom': '1px solid black'}}
                       exact to={"/comics"}>Comics</NavLink></li>
        </ul>
      </nav>
    </header>
  )
}

export default AppHeader;
