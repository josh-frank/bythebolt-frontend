import { useSelector } from "react-redux";
import { Item } from "semantic-ui-react";

function MyListingsPanel() {

    const currentUser = useSelector( state => state.currentUser );
    
    const userListingCards = currentUser.listings.map( listing => {
        return <Item key={ listing.id }>
            <Item.Image size='tiny' src='https://react.semantic-ui.com/images/wireframe/image.png' />
            <Item.Content>
                <Item.Header as='a'>{ listing.title }</Item.Header>
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
