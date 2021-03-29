import '../App.css';
import { useEffect } from 'react';
import { Route, /*NavLink,*/ Switch } from "react-router-dom";
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
import ListingView from './ListingView';
import ChatsPage from './ChatsPage';
import { fetchProfile, fetchCategories } from '../utilities/fetchData';
import SearchResultsPage from './SearchResultsPage';

function App() {

  const dispatch = useDispatch();  

  useEffect( () => {
    const token = localStorage.getItem( "token" );
    if ( token ) {
      fetchProfile( token ).then( userData => dispatch( setCurrentUser( userData ) ) );
    }
    fetchCategories().then( categoryData => dispatch( setAllCategories( categoryData ) ) );
    fetch( `${ process.env.REACT_APP_API_URL }/listings` ).then( response => response.json() ).then( listingData => dispatch( setAllListings( listingData ) ) );
  }, [ dispatch ] );

  return (
    <div className="app">
      <section><NavBar /></section>
      <section><CategoryMenu /></section>
      <section className="app-content">
        <Switch>
          <Route exact path="/">
            { useSelector( state => state.allListings ) && <ListingsPage /> }
          </Route>
          <Route exact path="/chats">
            <ChatsPage />
          </Route>
          <Route exact path="/chats/:chatId">
            <ChatsPage />
          </Route>
          <Route exact path="/listing/:listingId">
            <ListingView />
          </Route>
          <Route exact path="/search/:searchCategory/:searchQuery">
            <SearchResultsPage />
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
        </Switch>
      </section>
      <section><Footer /></section>
    </div>
  );

}

export default App;

