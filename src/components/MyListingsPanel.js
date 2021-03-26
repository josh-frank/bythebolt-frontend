import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Button, Confirm, Header, Icon, Item } from "semantic-ui-react";
import { setAllListings } from "../redux/allListingsSlice";
import { setCurrentUser } from "../redux/currentUserSlice";
import { deleteListing } from "../utilities/fetchData";

function MyListingsPanel() {

    const history = useHistory();

    const dispatch = useDispatch();

    const currentUser = useSelector( state => state.currentUser );

    const allListings = useSelector( state => state.allListings );

    const [ showDeleteModal, toggleShowDeleteModal ] = useState( false );
    const [ listingToDelete, setListingToDelete ] = useState( null );

    function confirmDeleteListing( listing ) {
        setListingToDelete( listing );
        toggleShowDeleteModal( true );
    }

    function cancelDeleteListing() {
        setListingToDelete( null );
        toggleShowDeleteModal( false );
    }

    function deleteThisListing() {
        const token = localStorage.getItem( "token" );
        deleteListing( token, listingToDelete.id ).then( userData => {
            dispatch( setCurrentUser( userData ) );
            dispatch( setAllListings( allListings.filter( listing => listing.id !== listingToDelete.id ) ) );
            toggleShowDeleteModal( false );
        } );
    }
    
    const userListingCards = currentUser.listings.map( listing => {
        return <Item key={ listing.id }>
            <Item.Image
                size="tiny"
                style={ {
                    backgroundImage: `url( ${ listing.image_urls[ 0 ] } )`,
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                } }
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
                        onClick={ () => confirmDeleteListing( listing ) }
                    >
                        <Icon name="trash alternate" />
                        Delete listing
                    </Button>
                </Item.Extra>
            </Item.Content>
        </Item>
    } );

    return (
        <>
            { listingToDelete && <Confirm
                open={ showDeleteModal }
                header={ `Are you sure you want to delete this listing: ${ listingToDelete.title }?` }
                content={ <Header size="small">This cannot be undone!</Header> }
                confirmButton="Delete Listing"
                onConfirm={ deleteThisListing }
                onCancel={ cancelDeleteListing }
            /> }
            <Item.Group>
                { userListingCards.length ? userListingCards : <em>No listings yet!</em> }
            </Item.Group>
        </>
    );

}

export default MyListingsPanel;
