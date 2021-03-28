import { createRef, useEffect, useState } from "react";
import { useParams } from "react-router";
import { Card, Container, Divider, Dropdown, Grid, Header, Label, Menu, Pagination, Sticky } from "semantic-ui-react";
import ListingCard from "./ListingCard";
import { fetchSearchResults } from '../utilities/fetchData';
import { Link } from "react-router-dom";

function SearchResultsPage() {

    const { searchQuery } = useParams();

    const contextRef = createRef();

    const [ searchResults, setSearchResults ] = useState( [] );

    const [ searchPage, setSearchPage ] = useState( 1 );

    const [ searchLimit, setSearchLimit ] = useState( 12 );

    const [ searchMetadata, setSearchMetadata ] = useState( null );

    const [ searchCategoryData, setSearchCategoryData ] = useState( null );

    const [ selectedCategory, setSelectedCategory ] = useState( "" );

    useEffect( () => {
        fetchSearchResults( searchQuery.toLowerCase(), selectedCategory, searchPage, searchLimit ).then( searchResultData => {
            setSearchResults( searchResultData.listings );
            setSearchMetadata( searchResultData.metadata );
            setSearchCategoryData( searchResultData.categories );
        } );
    }, [ searchQuery, selectedCategory, searchPage, searchLimit ] );

    const cardList = searchResults.map( listing => <ListingCard key={ listing.id } listing={ listing } /> );

    const filterMenu = (
        <Menu vertical>
            <Menu.Item header>
                Display
                &nbsp;
                <Dropdown
                    compact
                    selection
                    options={ [
                        { key: 12, text: '12', value: 12 },
                        { key: 24, text: '24', value: 24 },
                        { key: 48, text: '48', value: 48 }
                    ] }
                    defaultValue={ searchLimit }
                    onChange={ ( changeEvent, { value } ) => setSearchLimit( value ) }
                />
            </Menu.Item>
            {/* <Menu.Item header>Sort By</Menu.Item>
            <Menu.Item
                name="closest"
                active={ null }
                onClick={ null }
            />
            <Menu.Item
                name="mostComments"
                active={ null }
                onClick={ null }
            />
            <Menu.Item
                name="mostPopular"
                active={ null }
                onClick={ null }
            /> */}
            <Menu.Item header>
                Categories
                &nbsp;
                (<Link onClick={ () => setSelectedCategory( "" ) }>Clear</Link>)
            </Menu.Item>
            { searchCategoryData && Object.keys( searchCategoryData ).map( categoryName => {
                return <Menu.Item
                    key={ categoryName }
                    name={ categoryName }
                    active={ selectedCategory === categoryName }
                    onClick={ ( changeEvent, { name } ) => setSelectedCategory( name ) }
                >
                    { categoryName } ({ searchCategoryData[ categoryName ] })
                </Menu.Item>
            } ) }
        </Menu>
    );

    return ( searchMetadata &&
        <div ref={ contextRef }>
            <Container style={ { marginTop: "10px" } }>
                <Grid>
                    <Grid.Column width={ 3 }>
                        <Sticky context={ contextRef } offset={ 10 }>{ filterMenu }</Sticky>
                    </Grid.Column>
                    <Grid.Column stretched width={ 13 }>
                        <Container className="center aligned">
                            <Header size="huge">
                                { searchMetadata.total_count } results for "{ searchQuery }"
                                &nbsp;
                                { !!selectedCategory.length &&
                                    <Label tag size="large" color="blue">{ selectedCategory }
                                </Label> }
                            </Header>
                            <Card.Group centered>
                                { cardList }
                            </Card.Group>
                            <Divider />
                            <Pagination
                                activePage={ searchPage }
                                totalPages={ searchMetadata.total_pages }
                                onPageChange={ ( changeEvent, { activePage } ) => setSearchPage( activePage ) }
                            />
                        </Container>
                    </Grid.Column>
                </Grid>
            </Container>
        </div>
    );

}

export default SearchResultsPage;
