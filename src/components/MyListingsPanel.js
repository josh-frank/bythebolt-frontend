import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Item } from "semantic-ui-react";

function MyListingsPanel() {

    const history = useHistory();

    const currentUser = useSelector( state => state.currentUser );
    
    const userListingCards = currentUser.listings.map( listing => {
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
                <Item.Extra>Additional Details</Item.Extra>
            </Item.Content>
        </Item>
    } );

    return (
        <Item.Group>
            { userListingCards.length ? userListingCards : <em>No listings yet!</em> }
        </Item.Group>
    );

}

export default MyListingsPanel;
