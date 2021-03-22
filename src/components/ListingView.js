import 'pure-react-carousel/dist/react-carousel.es.css';
import { ButtonBack, ButtonNext, CarouselProvider, Image as CarouselImage, Slider, Slide } from 'pure-react-carousel';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { Button, Card, Container, Header, Icon, Image, Label, Segment } from "semantic-ui-react";
import { distanceBetween } from "../utilities/distanceBetween";
import { setCurrentUser } from '../redux/currentUserSlice';

function ListingView() {

    const history = useHistory();

    const dispatch = useDispatch();

    const currentUser = useSelector( state => state.currentUser );

    const { listingId } = useParams();

    const [ thisListing, setThisListing ] = useState( null );

    const daysSinceCreated = thisListing && Math.floor( ( Date.now() - Date.parse( thisListing.created_at ) ) / 86_400_000 );

    const isMine = currentUser && thisListing && !!currentUser.listings.find( listing => listing.id === thisListing.id )
    console.log('isMine: ', isMine);

    useEffect( () => {
        fetch( `${ process.env.REACT_APP_API_URL }/listings/${ listingId }` )
            .then( response => {
                if ( response.ok ) return response.json();
                history.push( "/" );
            } ).then( setThisListing );
    }, [ listingId, history ] );

    const thisFavorite = currentUser && thisListing ? currentUser.favorite_listings.find( favoriteListing => {
        return favoriteListing.listing.id === thisListing.id;
    } ) : null;

    const token = localStorage.getItem( "token" );

    function addToFavorites() {
        fetch( `${ process.env.REACT_APP_API_URL }/favorites`, {
            method: "POST",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${ token }` },
            body: JSON.stringify( { listing_id: thisListing.id } )
        } ).then( response => response.json() ).then( userData => {
            dispatch( setCurrentUser( userData ) );
        } );
    }

    function removeFromFavorites() {
        fetch( `${ process.env.REACT_APP_API_URL }/favorites/${ thisFavorite.id }`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${ token }` }
        } ).then( response => response.json() ).then( userData => {
            dispatch( setCurrentUser( userData ) );
        } );
    }

    const sellerCard = ( thisListing &&
        <Card>
            <Card.Content>
                { thisListing.user.avatar_url && <Image
                    avatar
                    floated="right"
                    src={ thisListing.user.avatar_url }
                    alt={ thisListing.user.username }
                /> }
                <Card.Header>{ thisListing.user.username }</Card.Header>
                <Card.Meta>
                    Member since { new Date( thisListing.user.created_at ).toLocaleDateString() }
                </Card.Meta>
                { currentUser && currentUser.location && <Card.Description>
                    <Icon name="map signs" />
                    { distanceBetween( thisListing.user.location, currentUser.location ).toFixed( 1 ) } mi. away
                </Card.Description> }
            </Card.Content>
        </Card>
    );

    const listingImageCarousel = ( thisListing &&
        <CarouselProvider
            naturalSlideWidth={6}
            naturalSlideHeight={4}
            totalSlides={ thisListing.image_urls.length }
        >
            <Slider>
                { thisListing.image_urls.map( ( imageUrl, index ) => {
                    return <Slide key={ index } index={ index }>
                        <Image as={ CarouselImage } src={ imageUrl }/>
                    </Slide>
                } ) }
            </Slider>
            <ButtonBack>Back</ButtonBack>
            <ButtonNext>Next</ButtonNext>
        </CarouselProvider>
    );

    return ( thisListing &&
        <Container style={ { marginTop: "10px" } }>
            <Segment.Group>
                <Segment>
                    <Header size="huge">{ thisListing.title }</Header>
                </Segment>
                <Segment secondary>
                    { thisListing.listing_categories.map( listingCategory => {
                        return <Label tag key={ listingCategory.id }>{ listingCategory.category.name }</Label>
                    } ) }
                </Segment>
            </Segment.Group>
            <Segment.Group horizontal>
                <Segment loading={ !thisListing }>
                    { listingImageCarousel }
                </Segment>
                <Segment style={ { maxWidth: "25vw" } }>
                    { sellerCard }
                    <Icon name="calendar alternate" />
                    Listed { !daysSinceCreated ? null : daysSinceCreated }{ daysSinceCreated < 1 ? "Today" : daysSinceCreated === 1 ? " day ago" : " days ago" }
                    { !!thisListing.favorites.length && <div>
                        <Icon name="heart" />
                            Favorited by { thisListing.favorites.length } { thisListing.favorites.length === 1 ? "user" : "users" }
                    </div> }
                    <br /><br />
                    { !isMine && <Button
                        primary
                        icon
                        size="mini"
                        labelPosition="left"
                        onClick={ thisFavorite ? removeFromFavorites : addToFavorites }
                    >
                        <Icon name={ thisFavorite ? "heart outline" : "heart" }/>
                        { thisFavorite ? "Remove from Favorites" : "Add to Favorites" }
                    </Button> }
                </Segment>
            </Segment.Group>
            <Segment.Group>
                <Segment>
                    <Label ribbon color={ thisListing.quantity === 1 ? "red" : null }>
                        { thisListing.quantity === 1 ? "Last one!" : thisListing.quantity + " available" }
                    </Label>
                    <span style={ { fontSize: "21pt", fontWeight: "bold" } }>
                        ${ parseFloat( thisListing.price ).toFixed( Number.isInteger( parseFloat( thisListing.price ) ) ? 0 : 2 ) }
                    </span>
                    { thisListing.unit && <span style={ { fontSize: "16pt", fontWeight: "bold" } }>/{ thisListing.unit }</span> }
                    &nbsp;
                </Segment>
                <Segment>
                    <Label ribbon>Description</Label>
                    <br /><br />
                    <p style={ { fontSize: "12pt" } }>{ thisListing.description }</p>
                </Segment>
            </Segment.Group>
        </Container>
    );

}

export default ListingView;
