import '../App.css';
import { useEffect } from 'react';
import { Route /*, NavLink, Switch */ } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentUser } from '../redux/currentUserSlice';
import { setAllCategories } from '../redux/allCategoriesSlice';
import { setAllListings } from '../redux/allListingsSlice';
import NavBar from './NavBar';
import CategoryMenu from './CategoryMenu';
import ProfilePage from './ProfilePage';
import ListingsPage from './ListingsPage';
import Footer from './Footer';
import CreateListingPage from './CreateListingPage';

function App() {

  const dispatch = useDispatch();  

  useEffect( () => {
    const token = localStorage.getItem( "token" );
    if ( token ) {
      fetch( `${ process.env.REACT_APP_API_URL }/profile`, {
        headers: { Authorization: `Bearer ${ token }` }
      } ).then( response => response.json() ).then( userData => dispatch( setCurrentUser( userData ) ) );
    }
    fetch( `${ process.env.REACT_APP_API_URL }/categories` ).then( response => response.json() )
        .then( categoryData => dispatch( setAllCategories( categoryData ) ) );
    fetch( `${ process.env.REACT_APP_API_URL }/listings` ).then( response => response.json() )
        .then( listingData => dispatch( setAllListings( listingData ) ) );
  }, [ dispatch ] );

  return (
    <div className="app">
      <section><NavBar /></section>
      <section><CategoryMenu /></section>
      <section className="app-content">
        <Route exact path="/">
          { useSelector( state => state.allListings ) && <ListingsPage /> }
        </Route>
        <Route exact path="/my_profile">
          <ProfilePage activeItem="profile" />
        </Route>
        <Route exact path="/my_listings">
          <ProfilePage activeItem="listings" />
        </Route>
        <Route exact path="/my_favorites">
          <ProfilePage activeItem="favorites" />
        </Route>
        <Route exact path="/settings">
          <ProfilePage activeItem="settings" />
        </Route>
        <Route exact path="/new_listing">
          <CreateListingPage />
        </Route>
      </section>
      <section><Footer /></section>
    </div>
  );

}

export default App;
