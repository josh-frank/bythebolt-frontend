import { createRef, useEffect, useState } from "react";
import { useParams } from "react-router";
import { Card, Container, Divider, Dropdown, Grid, Header, Label, Menu, Pagination, Sticky } from "semantic-ui-react";
import ListingCard from "./ListingCard";
import { fetchSearchResults } from '../utilities/fetchData';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function SearchResultsPage() {

    const { searchCategory, searchQuery } = useParams();

    const contextRef = createRef();

    const currentUser = useSelector( state => state.currentUser );

    const [ searchResults, setSearchResults ] = useState( [] );

    const [ searchPage, setSearchPage ] = useState( 1 );

    const [ searchLimit, setSearchLimit ] = useState( 12 );

    const [ searchMetadata, setSearchMetadata ] = useState( null );

    const [ searchCategoryData, setSearchCategoryData ] = useState( null );

    const [ selectedCategory, setSelectedCategory ] = useState( searchCategory === "all" ? "" : decodeURIComponent( searchCategory ) );

    const [ searchSort, setSearchSort ] = useState( "" );

    useEffect( () => {
        fetchSearchResults( searchQuery.toLowerCase(), selectedCategory, searchSort, currentUser ? currentUser.location : "", searchPage, searchLimit )
            .then( searchResultData => {
                setSearchResults( searchResultData.listings );
                setSearchMetadata( searchResultData.metadata );
                setSearchCategoryData( searchResultData.categories );
            } );
    }, [ searchQuery, selectedCategory, searchSort, currentUser, searchPage, searchLimit ] );

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
            <Menu.Item header>Sort By</Menu.Item>
            <Menu.Item>
                <Dropdown
                    compact
                    selection
                    options={ currentUser ? [
                        { key: 1, text: "Newest first", value: "newest" },
                        { key: 2, text: "Nearest first", value: "nearest" },
                        { key: 3, text: "Lowest price first", value: "price-asc" },
                        { key: 4, text: "Highest price first", value: "price-desc" }
                    ] : [
                        { key: 1, text: "Newest first", value: "newest" },
                        { key: 2, text: "Lowest price first", value: "price-asc" },
                        { key: 3, text: "Highest price first", value: "price-desc" }
                    ] }
                    placeholder="Select filter"
                    defaultValue={ searchSort.length ? searchSort : null }
                    onChange={ ( changeEvent, { value } ) => setSearchSort( value ) }
                />
            </Menu.Item>
            <Menu.Item header>
                Categories
                &nbsp;
                (<Link to="#" onClick={ () => setSelectedCategory( "" ) }>Clear</Link>)
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

    const cardList = searchResults.map( listing => <ListingCard key={ listing.id } listing={ listing } /> );

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
                                { searchMetadata.total_count } results { searchQuery.replace( /\s/g, "" ).length ? `for "${ searchQuery }"` : null }
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
