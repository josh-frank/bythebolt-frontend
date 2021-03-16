import '../App.css';

import { useEffect } from 'react';
import { Route, NavLink, Switch } from "react-router-dom";

import { useDispatch } from 'react-redux';
import { setCurrentUser } from '../redux/currentUserSlice';

import NavBar from './NavBar';
import CategoryMenu from './CategoryMenu';
import Profile from './Profile';

function App() {

  const dispatch = useDispatch();

  useEffect( () => {
    const token = localStorage.getItem( "token" );
    if ( token ) {
      fetch( `${process.env.REACT_APP_API_URL}/profile`, {
        headers: { Authorization: `Bearer ${ token }` }
      } ).then( response => response.json() ).then( userData => dispatch( setCurrentUser( userData ) ) );
    }
  }, [ dispatch ] );

  return (
    <div className="app">
      <section><NavBar /></section>
      <section><CategoryMenu /></section>
      <section className="app-content">
        <Route exact path="/profile">
          <Profile />
        </Route>
      </section>
      {/* <div className="copyright-message">© { new Date().getFullYear() } ByTheBolt</div> */}
    </div>
  );

}

export default App;
