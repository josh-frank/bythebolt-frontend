import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Button, Confirm, Icon, Item } from "semantic-ui-react";
import { setCurrentUser } from "../redux/currentUserSlice";
import { unfavorite } from "../utilities/fetchData";

function MyFavoritesPanel() {

    const history = useHistory();

    const dispatch = useDispatch();

    const currentUser = useSelector( state => state.currentUser );

    const [ showDeleteModal, toggleShowDeleteModal ] = useState( false );
    const [ favoriteToDelete, setFavoriteToDelete ] = useState( null );

    function confirmDeleteFavorite( favorite ) {
        setFavoriteToDelete( favorite );
        toggleShowDeleteModal( true );
    }

    function cancelDeleteFavorite() {
        setFavoriteToDelete( null );
        toggleShowDeleteModal( false );
    }

    function deleteFavorite() {
        const token = localStorage.getItem( "token" );
        unfavorite( token, favoriteToDelete.id ).then( userData => {
            dispatch( setCurrentUser( userData ) );
            toggleShowDeleteModal( false );
        } );
    }

    const userFavoriteCards = currentUser.favorite_listings.map( favoriteListing => {
        const { listing } = favoriteListing;
        return <Item key={ listing.id }>
            <Item.Image
                size="tiny"
                src={ listing.image_urls[ 0 ] }
            />
            <Item.Content>
                <Item.Header
                    as="a"
                    onClick={ () => history.push( `listing/${ listing.id }` ) }
                >
                    { listing.title }
                </Item.Header>
                <Item.Meta></Item.Meta>
                <Item.Description>{ listing.description.split( " " ).slice( 0, 10 ).join( " " ) + "…" }</Item.Description>
                <Item.Extra>
                    <Button
                        negative
                        icon
                        size="mini"
                        labelPosition="left"
                        onClick={ () => confirmDeleteFavorite( favoriteListing ) }
                    >
                        <Icon name="heart outline"/>
                        Remove from favorites
                    </Button>
                </Item.Extra>
            </Item.Content>
        </Item>
    } );

    return (
        <>
            { favoriteToDelete && <Confirm
                open={ showDeleteModal }
                header={ `Are you sure you want to remove the listing "${ favoriteToDelete.listing.title }" from your favorites?` }
                confirmButton="Remove from Favorites"
                onConfirm={ deleteFavorite }
                onCancel={ cancelDeleteFavorite }
            /> }
            <Item.Group>
                { userFavoriteCards.length ? userFavoriteCards : <em>No favorites yet!</em> }
            </Item.Group>
        </>
    );

}

export default MyFavoritesPanel;