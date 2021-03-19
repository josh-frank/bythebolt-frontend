import { useSelector } from "react-redux";
import { Card, Container } from "semantic-ui-react";
import ListingCard from "./ListingCard";

function ListingsPage() {

    const allListings = useSelector( state => state.allListings );

    const cardList = allListings.map( listing => <ListingCard key={ listing.id } listing={ listing } /> );

    return (
        <Container style={ { marginTop: "5px" } }>
            <Card.Group>
                { cardList }
            </Card.Group>
        </Container>
    );

}

export default ListingsPage;
