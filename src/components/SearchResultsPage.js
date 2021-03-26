import { useParams } from "react-router";
import { Container, Header } from "semantic-ui-react";

function SearchResultsPage() {

    const { searchQuery } = useParams();

    return (
        <Container style={ { marginTop: "10px" } }>
            <Header size="huge">Search results for "{ searchQuery }"</Header>
        </Container>
    );

}

export default SearchResultsPage;