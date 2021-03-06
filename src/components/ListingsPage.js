import { useSelector } from "react-redux";
import { Card, Container } from "semantic-ui-react";
import ListingCard from "./ListingCard";

function ListingsPage() {

    const allListings = useSelector( state => state.allListings );

    const cardList = allListings.map( listing => <ListingCard key={ listing.id } listing={ listing } /> );

    return (
        <Container className="center aligned" style={ { marginTop: "10px" } }>
            <Card.Group centered>
                { cardList }
            </Card.Group>
        </Container>
    );

}

export default ListingsPage;
